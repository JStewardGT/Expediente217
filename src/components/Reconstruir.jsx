import { useState, useRef } from 'react'
import Acierto from './comun/Acierto.jsx'
import { sonarError } from '../audio/sonido.js'

// Mecánica de arrastrar para reconstruir (sala 5).
// El jugador arrastra cada pieza desde la bandeja hasta su lugar en el fondo.
// Usa Pointer Events (mouse + touch) con pointer capture; `touch-action: none`
// (en CSS) evita que la página haga scroll mientras se arrastra.
export default function Reconstruir({ sala, onResuelto }) {
  const { fondo, fondoAspecto, piezas, tolerancia = 15, recompensa } = sala
  const lienzoRef = useRef(null)
  const arrastreRef = useRef(null) // id de la pieza en arrastre
  const [colocadas, setColocadas] = useState([]) // ids ya encajadas
  const [arrastre, setArrastre] = useState(null) // { id, x, y } en % del lienzo

  const completo = colocadas.length === piezas.length

  // Posición del puntero como % del lienzo.
  const pctDesdeEvento = (e) => {
    const r = lienzoRef.current.getBoundingClientRect()
    return {
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    }
  }

  const onDown = (e, pieza) => {
    if (colocadas.includes(pieza.id)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    arrastreRef.current = pieza.id
    const p = pctDesdeEvento(e)
    setArrastre({ id: pieza.id, x: p.x, y: p.y })
  }

  const onMove = (e) => {
    if (!arrastreRef.current) return
    const p = pctDesdeEvento(e)
    setArrastre((a) => (a ? { ...a, x: p.x, y: p.y } : a))
  }

  const onUp = (e, pieza) => {
    if (arrastreRef.current !== pieza.id) return
    const p = pctDesdeEvento(e)
    const dist = Math.hypot(p.x - pieza.destino.x, p.y - pieza.destino.y)
    if (dist <= tolerancia) {
      setColocadas((c) => [...c, pieza.id])
    } else {
      sonarError()
    }
    arrastreRef.current = null
    setArrastre(null)
  }

  return (
    <div className="mecanica reconstruir">
      <div
        className="recon-lienzo"
        ref={lienzoRef}
        style={{ aspectRatio: fondoAspecto }}
      >
        <img className="recon-fondo" src={fondo} alt="" draggable="false" />

        {/* Piezas ya encajadas (a escala real sobre su destino) */}
        {piezas
          .filter((p) => colocadas.includes(p.id))
          .map((p) => (
            <img
              key={p.id}
              className="recon-colocada"
              src={p.img}
              alt={p.nombre}
              draggable="false"
              style={{
                left: `${p.destino.x}%`,
                top: `${p.destino.y}%`,
                width: `${p.ancho}%`,
              }}
            />
          ))}

        {/* Pieza flotante mientras se arrastra: MISMO tamaño que tendrá al encajar */}
        {arrastre &&
          (() => {
            const p = piezas.find((x) => x.id === arrastre.id)
            return (
              <img
                className="recon-flotante"
                src={p.img}
                alt=""
                draggable="false"
                style={{
                  left: `${arrastre.x}%`,
                  top: `${arrastre.y}%`,
                  width: `${p.ancho}%`,
                }}
              />
            )
          })()}
      </div>

      {completo ? (
        // Rompecabezas completo visible + mensaje de acierto al mismo tiempo
        <Acierto recompensa={recompensa} onContinuar={onResuelto} />
      ) : (
        <>
          <p className="recon-ayuda">
            {colocadas.length}/{piezas.length} estructuras colocadas
          </p>

          <div className="recon-bandeja">
            {piezas
              .filter((p) => !colocadas.includes(p.id))
              .map((p) => (
                <div key={p.id} className="recon-slot">
                  <img
                    className={`recon-pieza ${arrastre?.id === p.id ? 'oculta' : ''}`}
                    src={p.img}
                    alt={p.nombre}
                    draggable="false"
                    onPointerDown={(e) => onDown(e, p)}
                    onPointerMove={onMove}
                    onPointerUp={(e) => onUp(e, p)}
                  />
                  <span className="recon-pieza-nombre">{p.nombre}</span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
