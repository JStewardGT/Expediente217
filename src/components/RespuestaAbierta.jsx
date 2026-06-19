import { useState } from 'react'
import Acierto from './comun/Acierto.jsx'

// Normaliza para comparar tolerando mayúsculas, acentos y espacios.
const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

// Mecánica de respuesta abierta con validación tolerante (salas 11, 14).
export default function RespuestaAbierta({ sala, onResuelto }) {
  const { respuestasAceptadas, recompensa, esFinal } = sala
  const [valor, setValor] = useState('')
  const [estado, setEstado] = useState('jugando') // jugando | error | ok

  const comprobar = () => {
    const v = normalizar(valor)
    const ok = v.length > 0 && respuestasAceptadas.some((r) => normalizar(r) === v)
    setEstado(ok ? 'ok' : 'error')
  }

  if (estado === 'ok') {
    return (
      <Acierto
        recompensa={recompensa}
        onContinuar={onResuelto}
        etiqueta={esFinal ? 'Confirmar diagnóstico' : 'Continuar'}
      />
    )
  }

  return (
    <div className="mecanica abierta">
      <input
        className="abierta-input"
        value={valor}
        onChange={(e) => {
          setValor(e.target.value)
          setEstado('jugando')
        }}
        onKeyDown={(e) => e.key === 'Enter' && comprobar()}
        placeholder="Escribe tu respuesta"
        autoComplete="off"
        autoCapitalize="none"
      />
      {estado === 'error' && (
        <p className="feedback-error">
          No es correcto. Revisa la pista e intenta de nuevo.
        </p>
      )}
      <button
        className="btn-principal"
        onClick={comprobar}
        disabled={!valor.trim()}
      >
        Comprobar
      </button>
    </div>
  )
}
