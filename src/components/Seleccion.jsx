import { useState, useMemo } from 'react'
import Acierto from './comun/Acierto.jsx'
import { sonarError } from '../audio/sonido.js'

function barajar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Mecánica de selección única o múltiple (salas 1, 2, 6, 7, 10, 13).
export default function Seleccion({ sala, onResuelto }) {
  const { opciones, correctas, multiple, recompensa } = sala
  // Barajar para que la(s) respuesta(s) correcta(s) no queden siempre primero.
  const opcionesMezcladas = useMemo(() => barajar(opciones), [opciones])
  const [seleccion, setSeleccion] = useState([])
  const [estado, setEstado] = useState('jugando') // jugando | error | ok

  const alternar = (op) => {
    if (estado === 'ok') return
    setEstado('jugando')
    if (multiple) {
      setSeleccion((s) =>
        s.includes(op) ? s.filter((x) => x !== op) : [...s, op],
      )
    } else {
      setSeleccion([op])
    }
  }

  const comprobar = () => {
    const a = [...seleccion].sort()
    const b = [...correctas].sort()
    const ok = a.length === b.length && a.every((v, i) => v === b[i])
    if (!ok) sonarError()
    setEstado(ok ? 'ok' : 'error')
  }

  if (estado === 'ok') {
    return <Acierto recompensa={recompensa} onContinuar={onResuelto} />
  }

  return (
    <div className="mecanica seleccion">
      <ul className="opciones">
        {opcionesMezcladas.map((op) => {
          const activa = seleccion.includes(op)
          return (
            <li key={op}>
              <button
                className={`opcion ${activa ? 'activa' : ''}`}
                onClick={() => alternar(op)}
              >
                <span className="opcion-marca">
                  {multiple ? (activa ? '☑' : '☐') : activa ? '◉' : '○'}
                </span>
                {op}
              </button>
            </li>
          )
        })}
      </ul>
      {estado === 'error' && (
        <p className="feedback-error">
          Diagnóstico incorrecto. Revisa los datos e intenta de nuevo.
        </p>
      )}
      <button
        className="btn-principal"
        onClick={comprobar}
        disabled={seleccion.length === 0}
      >
        Comprobar
      </button>
    </div>
  )
}
