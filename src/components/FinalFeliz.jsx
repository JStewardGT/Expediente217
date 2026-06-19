// Pantalla final de victoria: paciente estabilizado, misión completada.
export default function FinalFeliz({ final, onReiniciar }) {
  return (
    <div className="pantalla pantalla-final">
      <div className="monitor-latido" aria-hidden="true" />
      <div className="final-contenido">
        <p className="final-diagnostico-label">DIAGNÓSTICO DEFINITIVO</p>
        <h1 className="final-diagnostico">{final.diagnostico}</h1>
        <ul className="final-mensajes">
          {final.mensajes.map((m, i) => (
            <li key={i}>✓ {m}</li>
          ))}
        </ul>
        <h2 className="final-titulo glitch" data-text={final.titulo}>
          {final.titulo}
        </h2>
        <button className="btn-principal" onClick={onReiniciar}>
          JUGAR DE NUEVO
        </button>
      </div>
    </div>
  )
}
