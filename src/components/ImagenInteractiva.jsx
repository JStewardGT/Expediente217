import { useState } from 'react'
import Acierto from './comun/Acierto.jsx'
import AnatomiaSVG from './AnatomiaSVG.jsx'
import { sonarError } from '../audio/sonido.js'

// Mecánica de imagen interactiva: localizar estructuras tocando la imagen
// (salas 5 y 8). Se pide una estructura a la vez; el jugador toca la zona.
export default function ImagenInteractiva({ sala, onResuelto }) {
  const { objetivos, recompensa } = sala
  const [encontrados, setEncontrados] = useState([]) // nombres ya localizados
  const [errorEn, setErrorEn] = useState(null) // nombre de zona tocada por error

  const pendientes = objetivos.filter((o) => !encontrados.includes(o.nombre))
  const objetivoActual = pendientes[0]
  const completo = pendientes.length === 0

  const tocarZona = (obj) => {
    if (encontrados.includes(obj.nombre)) return
    if (obj.nombre === objetivoActual.nombre) {
      setEncontrados((e) => [...e, obj.nombre])
      setErrorEn(null)
    } else {
      sonarError()
      setErrorEn(obj.nombre)
      setTimeout(() => setErrorEn(null), 450)
    }
  }

  if (completo) return <Acierto recompensa={recompensa} onContinuar={onResuelto} />

  return (
    <div className="mecanica imagen">
      <p className="imagen-objetivo">
        Localiza: <strong>{objetivoActual.nombre}</strong>
      </p>

      <div className="imagen-lienzo">
        <AnatomiaSVG />
        {objetivos.map((obj) => {
          const hecho = encontrados.includes(obj.nombre)
          return (
            <button
              key={obj.nombre}
              className={`zona ${hecho ? 'hecha' : ''} ${errorEn === obj.nombre ? 'sacudir' : ''}`}
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                width: `${obj.r * 2}%`,
                height: `${obj.r * 2}%`,
              }}
              onClick={() => tocarZona(obj)}
              aria-label={hecho ? obj.nombre : 'zona por identificar'}
            >
              {hecho && <span className="zona-etiqueta">{obj.nombre}</span>}
            </button>
          )
        })}
      </div>

      <div className="imagen-progreso">
        {objetivos.map((o) => (
          <span
            key={o.nombre}
            className={`chip ${encontrados.includes(o.nombre) ? 'ok' : ''}`}
          >
            {encontrados.includes(o.nombre) ? '✓ ' : '• '}
            {o.nombre}
          </span>
        ))}
      </div>
    </div>
  )
}
