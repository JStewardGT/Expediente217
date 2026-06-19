import { useState } from 'react'
import Acierto from './comun/Acierto.jsx'

// Mecánica de selección única o múltiple (salas 1, 2, 6, 7, 10, 13).
export default function Seleccion({ sala, onResuelto }) {
  const { opciones, correctas, multiple, recompensa } = sala
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
    setEstado(ok ? 'ok' : 'error')
  }

  if (estado === 'ok') {
    return <Acierto recompensa={recompensa} onContinuar={onResuelto} />
  }

  return (
    <div className="mecanica seleccion">
      <ul className="opciones">
        {opciones.map((op) => {
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
