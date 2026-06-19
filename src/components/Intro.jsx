// Pantalla de introducción: historia del Hospital San Gabriel y misión.
export default function Intro({ intro, onComenzar }) {
  return (
    <div className="pantalla pantalla-intro">
      <div className="niebla" aria-hidden="true" />
      <div className="intro-contenido">
        <p className="intro-hospital">{intro.hospital}</p>
        <h1 className="intro-titulo glitch" data-text={intro.titulo}>
          {intro.titulo}
        </h1>
        <div className="intro-historia">
          {intro.historia.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>
        <p className="intro-mision">
          <span>MISIÓN:</span> {intro.mision}
        </p>
        <button className="btn-principal" onClick={onComenzar}>
          INGRESAR AL HOSPITAL
        </button>
      </div>
    </div>
  )
}
