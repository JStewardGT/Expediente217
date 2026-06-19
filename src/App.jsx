import { useState, useEffect, useCallback } from 'react'
import { SALAS, CONFIG, INTRO, FINAL } from './data/salas.js'
import { iniciarAudio, setSilenciado, sonarLatido } from './audio/sonido.js'
import Cronometro from './components/Cronometro.jsx'
import PanelPistas from './components/PanelPistas.jsx'
import Intro from './components/Intro.jsx'
import FinalFeliz from './components/FinalFeliz.jsx'
import GameOver from './components/GameOver.jsx'
import Sala from './components/Sala.jsx'

// Fases del juego: intro -> jugando -> (final | gameover)
export default function App() {
  const [fase, setFase] = useState('intro')
  const [indiceSala, setIndiceSala] = useState(0)
  const [pistasUsadas, setPistasUsadas] = useState(0)
  const [tiempoAgotado, setTiempoAgotado] = useState(false)
  const [silenciado, setSilenciadoEstado] = useState(false)

  const salaActual = SALAS[indiceSala]
  const totalSalas = SALAS.length

  // --- Progresión lineal: resolver la sala actual avanza a la siguiente ------
  const resolverSala = useCallback(() => {
    setIndiceSala((i) => {
      if (i + 1 >= totalSalas) {
        setFase('final')
        return i
      }
      return i + 1
    })
  }, [totalSalas])

  // --- Cronómetro agotado ---------------------------------------------------
  const alAgotarseTiempo = useCallback(() => {
    setTiempoAgotado(true)
    setFase('gameover')
  }, [])

  // --- Sistema de pistas (máx. CONFIG.pistasDisponibles) --------------------
  const pistasRestantes = CONFIG.pistasDisponibles - pistasUsadas
  const usarPista = useCallback(() => {
    setPistasUsadas((n) => Math.min(n + 1, CONFIG.pistasDisponibles))
  }, [])

  const reiniciar = useCallback(() => {
    setIndiceSala(0)
    setPistasUsadas(0)
    setTiempoAgotado(false)
    setFase('intro')
  }, [])

  const alternarSonido = useCallback(() => {
    setSilenciadoEstado((s) => {
      const nuevo = !s
      setSilenciado(nuevo)
      return nuevo
    })
  }, [])

  // Bloquear scroll del body durante el juego (experiencia tipo app móvil)
  useEffect(() => {
    document.body.classList.toggle('jugando', fase === 'jugando')
  }, [fase])

  // Latido del monitor cardíaco mientras se juega.
  useEffect(() => {
    if (fase !== 'jugando') return
    const id = setInterval(() => sonarLatido(), 3000)
    return () => clearInterval(id)
  }, [fase])

  if (fase === 'intro') {
    return (
      <Intro
        intro={INTRO}
        onComenzar={() => {
          iniciarAudio()
          setFase('jugando')
        }}
      />
    )
  }

  if (fase === 'final') {
    return <FinalFeliz final={FINAL} onReiniciar={reiniciar} />
  }

  if (fase === 'gameover') {
    return <GameOver onReiniciar={reiniciar} agotado={tiempoAgotado} />
  }

  // fase === 'jugando'
  return (
    <div className="app-shell">
      <div className="niebla" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="flicker" aria-hidden="true" />
      <header className="hud">
        <div className="hud-progreso">
          Sala <strong>{indiceSala + 1}</strong> / {totalSalas}
        </div>
        <Cronometro
          minutos={CONFIG.duracionMinutos}
          activo={fase === 'jugando'}
          onAgotado={alAgotarseTiempo}
        />
        <PanelPistas
          pista={salaActual.pista}
          restantes={pistasRestantes}
          onUsarPista={usarPista}
        />
        <button
          className="btn-sonido"
          onClick={alternarSonido}
          aria-label={silenciado ? 'Activar sonido' : 'Silenciar'}
          title={silenciado ? 'Activar sonido' : 'Silenciar'}
        >
          {silenciado ? '🔇' : '🔊'}
        </button>
      </header>

      <main className="escenario">
        <Sala
          key={salaActual.id}
          sala={salaActual}
          onResuelto={resolverSala}
        />
      </main>
    </div>
  )
}
