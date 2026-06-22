import { useState } from 'react'
import Acierto from './comun/Acierto.jsx'
import { sonarError } from '../audio/sonido.js'

// Candado numérico (sala 4).
// Si la sala trae `pistasInteractivas`, primero se muestran los elementos a tocar
// que revelan las palabras del enunciado y los dígitos del código.
export default function Candado({ sala, onResuelto }) {
  const {
    codigo,
    longitud,
    acertijo,
    recompensa,
    enunciado,
    pistasInteractivas,
    imagenFondo,
    imagenAspecto,
  } = sala
  const [entrada, setEntrada] = useState('')
  const [estado, setEstado] = useState('jugando') // jugando | error | ok
  const [descubiertos, setDescubiertos] = useState([]) // ids de pistas reveladas

  const pulsar = (d) => {
    if (estado === 'ok') return
    setEstado('jugando')
    setEntrada((e) => (e.length < longitud ? e + d : e))
  }
  const borrar = () => {
    setEstado('jugando')
    setEntrada((e) => e.slice(0, -1))
  }
  const comprobar = () => {
    const ok = entrada === codigo
    if (!ok) sonarError()
    setEstado(ok ? 'ok' : 'error')
  }

  const descubrir = (id) => {
    setDescubiertos((d) => (d.includes(id) ? d : [...d, id]))
  }

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
      {/* --- Pistas interactivas (descubrimiento) --- */}
      {pistasInteractivas && (
        <>
          {enunciado && (
            <p className="candado-enunciado">
              {enunciado.partes.map((parte, i) => {
                const pista = pistasInteractivas[i]
                const revelada = pista && descubiertos.includes(pista.id)
                return (
                  <span key={i}>
                    {parte}
                    {pista && (
                      <strong className={`hueco ${revelada ? 'lleno' : ''}`}>
                        {revelada ? pista.palabra : '_____'}
                      </strong>
                    )}
                  </span>
                )
              })}
            </p>
          )}

          <div className="candado-lienzo" style={{ aspectRatio: imagenAspecto }}>
            <img className="candado-fondo" src={imagenFondo} alt="" draggable="false" />
            {pistasInteractivas.map((pista) => {
              const revelada = descubiertos.includes(pista.id)
              const { x, y, ancho, alto } = pista.posicion
              return (
                <button
                  key={pista.id}
                  type="button"
                  className={`candado-hotspot ${revelada ? 'revelado' : ''}`}
                  onClick={() => descubrir(pista.id)}
                  aria-label={pista.nombre}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${ancho}%`,
                    height: `${alto}%`,
                  }}
                >
                  {revelada && (
                    <span className="candado-hotspot-digito">{pista.digito}</span>
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}

      {acertijo && <p className="candado-acertijo">{acertijo}</p>}

      {/* --- Teclado --- */}
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
