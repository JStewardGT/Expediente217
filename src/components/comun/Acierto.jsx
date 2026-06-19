import { useEffect } from 'react'
import { sonarAcierto } from '../../audio/sonido.js'

// Panel compartido de acierto: se muestra cuando una mecánica se resuelve bien.
// Da un momento para leer la recompensa antes de avanzar.
export default function Acierto({ recompensa, onContinuar, etiqueta = 'Continuar' }) {
  useEffect(() => {
    sonarAcierto()
  }, [])

  return (
    <div className="acierto">
      <p className="acierto-titulo">✓ Correcto</p>
      {recompensa && <p className="acierto-recompensa">{recompensa}</p>}
      <button className="btn-principal" onClick={onContinuar}>
        {etiqueta}
      </button>
    </div>
  )
}
