import { useState } from 'react'
import Acierto from './comun/Acierto.jsx'

// Baraja una copia del arreglo (Fisher-Yates).
function barajar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Mecánica de ordenar secuencia con "tap origen → destino" (sala 12).
// `pasos` llega en el orden CORRECTO; se baraja para presentar.
export default function Secuencia({ sala, onResuelto }) {
  const { pasos, recompensa } = sala
  const [disponibles, setDisponibles] = useState(() => {
    let mez = barajar(pasos)
    if (mez.join('|') === pasos.join('|')) mez = barajar(pasos) // evitar salir ya ordenado
    return mez
  })
  const [orden, setOrden] = useState([])
  const [estado, setEstado] = useState('jugando') // jugando | error | ok

  const elegir = (p) => {
    if (estado === 'ok') return
    setEstado('jugando')
    setOrden((o) => [...o, p])
    setDisponibles((d) => d.filter((x) => x !== p))
  }
  const quitar = (p) => {
    setEstado('jugando')
    setOrden((o) => o.filter((x) => x !== p))
    setDisponibles((d) => [...d, p])
  }
  const comprobar = () =>
    setEstado(orden.join('|') === pasos.join('|') ? 'ok' : 'error')

  if (estado === 'ok') {
    return <Acierto recompensa={recompensa} onContinuar={onResuelto} />
  }

  return (
    <div className="mecanica secuencia">
      <p className="secuencia-instr">Toca los pasos en el orden correcto:</p>

      <ol className="secuencia-orden">
        {orden.map((p, i) => (
          <li key={p}>
            <button className="paso elegido" onClick={() => quitar(p)}>
              <span className="paso-num">{i + 1}</span>
              {p}
              <span className="paso-x">✕</span>
            </button>
          </li>
        ))}
        {orden.length === 0 && (
          <li className="secuencia-vacio">(aún no has elegido pasos)</li>
        )}
      </ol>

      <div className="secuencia-banco">
        {disponibles.map((p) => (
          <button key={p} className="paso" onClick={() => elegir(p)}>
            {p}
          </button>
        ))}
      </div>

      {estado === 'error' && (
        <p className="feedback-error">
          La secuencia no es correcta. Toca un paso de arriba para devolverlo y reordena.
        </p>
      )}
      <button
        className="btn-principal"
        onClick={comprobar}
        disabled={disponibles.length > 0}
      >
        Comprobar
      </button>
    </div>
  )
}
