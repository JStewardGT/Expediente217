// Pantalla de derrota: el soporte vital falló (tiempo agotado).
export default function GameOver({ onReiniciar }) {
  return (
    <div className="pantalla pantalla-gameover">
      <div className="niebla niebla-roja" aria-hidden="true" />
      <div className="gameover-contenido">
        <h1 className="gameover-titulo glitch" data-text="SOPORTE VITAL PERDIDO">
          SOPORTE VITAL PERDIDO
        </h1>
        <p className="gameover-texto">
          El tiempo se agotó y el sistema de soporte falló por completo.
          El equipo no logró establecer el diagnóstico a tiempo.
        </p>
        <button className="btn-principal" onClick={onReiniciar}>
          REINTENTAR
        </button>
      </div>
    </div>
  )
}
