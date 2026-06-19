import { useState } from 'react'
import Acierto from './comun/Acierto.jsx'

// Candado numérico de N dígitos (sala 4).
export default function Candado({ sala, onResuelto }) {
  const { codigo, longitud, acertijo, recompensa } = sala
  const [entrada, setEntrada] = useState('')
  const [estado, setEstado] = useState('jugando') // jugando | error | ok

  const pulsar = (d) => {
    if (estado === 'ok') return
    setEstado('jugando')
    setEntrada((e) => (e.length < longitud ? e + d : e))
  }
  const borrar = () => {
    setEstado('jugando')
    setEntrada((e) => e.slice(0, -1))
  }
  const comprobar = () => setEstado(entrada === codigo ? 'ok' : 'error')

  if (estado === 'ok') {
    return (
      <Acierto
        recompensa={recompensa || 'La puerta oxidada se desbloquea.'}
        onContinuar={onResuelto}
      />
    )
  }

  const casillas = Array.from({ length: longitud }, (_, i) => entrada[i] ?? '')

  return (
    <div className="mecanica candado">
      {acertijo && <p className="candado-acertijo">{acertijo}</p>}
      <div className={`candado-display ${estado === 'error' ? 'sacudir' : ''}`}>
        {casillas.map((c, i) => (
          <span key={i} className="candado-casilla">
            {c || '•'}
          </span>
        ))}
      </div>
      {estado === 'error' && <p className="feedback-error">Código incorrecto.</p>}
      <div className="teclado">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
          <button key={d} className="tecla" onClick={() => pulsar(d)}>
            {d}
          </button>
        ))}
        <button className="tecla tecla-aux" onClick={borrar}>
          ⌫
        </button>
        <button className="tecla" onClick={() => pulsar('0')}>
          0
        </button>
        <button
          className="tecla tecla-ok"
          onClick={comprobar}
          disabled={entrada.length < longitud}
        >
          ✓
        </button>
      </div>
    </div>
  )
}
