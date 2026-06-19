import { useState, useMemo, useRef } from 'react'
import Acierto from './comun/Acierto.jsx'

function barajar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Mecánica de emparejar. Dos modos:
//   - 'tap'     : tocar elemento izquierdo, luego su pareja derecha (sala 3)
//   - 'memoria' : juego de memoria volteando cartas (sala 9)
export default function Emparejar({ sala, onResuelto }) {
  if (sala.modo === 'memoria') return <Memoria sala={sala} onResuelto={onResuelto} />
  return <Tap sala={sala} onResuelto={onResuelto} />
}

// ---------------------------------------------------------------------------
// MODO TAP: relacionar columnas
// ---------------------------------------------------------------------------
function Tap({ sala, onResuelto }) {
  const { pares, recompensa } = sala
  const izquierdas = pares.map((p) => p.izq)
  const derechas = useMemo(() => barajar(pares.map((p) => p.der)), [pares])

  const [selIzq, setSelIzq] = useState(null)
  const [emparejadas, setEmparejadas] = useState([]) // nombres izq ya resueltos
  const [error, setError] = useState(null) // der que falló (para sacudir)

  const completo = emparejadas.length === pares.length

  const tocarDer = (der) => {
    if (!selIzq) return
    const correcto = pares.some((p) => p.izq === selIzq && p.der === der)
    if (correcto) {
      setEmparejadas((e) => [...e, selIzq])
      setSelIzq(null)
      setError(null)
    } else {
      setError(der)
      setTimeout(() => setError(null), 450)
      setSelIzq(null)
    }
  }

  if (completo) return <Acierto recompensa={recompensa} onContinuar={onResuelto} />

  const derEmparejadas = pares
    .filter((p) => emparejadas.includes(p.izq))
    .map((p) => p.der)

  return (
    <div className="mecanica emparejar-tap">
      <div className="columnas">
        <div className="columna">
          {izquierdas.map((izq) => {
            const hecha = emparejadas.includes(izq)
            return (
              <button
                key={izq}
                className={`ficha ${selIzq === izq ? 'sel' : ''} ${hecha ? 'hecha' : ''}`}
                disabled={hecha}
                onClick={() => setSelIzq(izq)}
              >
                {izq}
              </button>
            )
          })}
        </div>
        <div className="columna">
          {derechas.map((der) => {
            const hecha = derEmparejadas.includes(der)
            return (
              <button
                key={der}
                className={`ficha ${hecha ? 'hecha' : ''} ${error === der ? 'sacudir' : ''}`}
                disabled={hecha}
                onClick={() => tocarDer(der)}
              >
                {der}
              </button>
            )
          })}
        </div>
      </div>
      <p className="emparejar-ayuda">
        {selIzq
          ? `Selecciona la pareja de "${selIzq}".`
          : 'Toca un elemento de la izquierda y luego su pareja.'}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MODO MEMORIA: voltear cartas
// ---------------------------------------------------------------------------
function Memoria({ sala, onResuelto }) {
  const { pares, recompensa } = sala

  // Cada par genera 2 cartas con la misma clave.
  const cartas = useMemo(() => {
    const baraja = pares.flatMap((p, i) => [
      { id: `${i}-a`, clave: i, texto: p.izq },
      { id: `${i}-b`, clave: i, texto: p.der },
    ])
    return barajar(baraja)
  }, [pares])

  const [volteadas, setVolteadas] = useState([]) // ids visibles temporalmente
  const [resueltas, setResueltas] = useState([]) // claves ya emparejadas
  const bloqueado = useRef(false)

  const completo = resueltas.length === pares.length

  const voltear = (carta) => {
    if (bloqueado.current) return
    if (volteadas.includes(carta.id)) return
    if (resueltas.includes(carta.clave)) return

    const nuevas = [...volteadas, carta.id]
    setVolteadas(nuevas)

    if (nuevas.length === 2) {
      const [a, b] = nuevas.map((id) => cartas.find((c) => c.id === id))
      if (a.clave === b.clave) {
        setResueltas((r) => [...r, a.clave])
        setVolteadas([])
      } else {
        bloqueado.current = true
        setTimeout(() => {
          setVolteadas([])
          bloqueado.current = false
        }, 800)
      }
    }
  }

  if (completo) return <Acierto recompensa={recompensa} onContinuar={onResuelto} />

  return (
    <div className="mecanica emparejar-memoria">
      <div className="cartas">
        {cartas.map((carta) => {
          const visible =
            volteadas.includes(carta.id) || resueltas.includes(carta.clave)
          return (
            <button
              key={carta.id}
              className={`carta ${visible ? 'visible' : ''} ${
                resueltas.includes(carta.clave) ? 'resuelta' : ''
              }`}
              onClick={() => voltear(carta)}
            >
              <span className="carta-cara">{visible ? carta.texto : '?'}</span>
            </button>
          )
        })}
      </div>
      <p className="emparejar-ayuda">Encuentra las parejas volteando las tarjetas.</p>
    </div>
  )
}
