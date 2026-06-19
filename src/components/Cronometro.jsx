import { useState, useEffect, useRef } from 'react'
import { sonarAlarma } from '../audio/sonido.js'

// Cronómetro visible en cuenta regresiva. Avisa con onAgotado al llegar a 0.
export default function Cronometro({ minutos, activo, onAgotado }) {
  const [restante, setRestante] = useState(minutos * 60)
  const avisado = useRef(false)

  useEffect(() => {
    if (!activo) return
    const id = setInterval(() => {
      setRestante((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [activo])

  useEffect(() => {
    if (restante === 0 && !avisado.current) {
      avisado.current = true
      onAgotado?.()
    }
  }, [restante, onAgotado])

  // Alarma cada 2s durante el último minuto.
  useEffect(() => {
    if (restante <= 60 && restante > 0 && restante % 2 === 0) {
      sonarAlarma()
    }
  }, [restante])

  const mm = String(Math.floor(restante / 60)).padStart(2, '0')
  const ss = String(restante % 60).padStart(2, '0')
  const critico = restante <= 60

  return (
    <div className={`cronometro ${critico ? 'critico' : ''}`} role="timer" aria-live="off">
      <span className="cronometro-icono" aria-hidden="true">⏱</span>
      <span className="cronometro-tiempo">{mm}:{ss}</span>
    </div>
  )
}
