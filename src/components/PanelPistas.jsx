import { useState, useEffect } from 'react'

// Botón de pista: muestra la pista de la sala actual y descuenta del cupo (máx. 2).
export default function PanelPistas({ pista, restantes, onUsarPista }) {
  const [abierta, setAbierta] = useState(false)
  const [yaPedidaAqui, setYaPedidaAqui] = useState(false)

  // Reiniciar estado al cambiar de sala (cambia el texto de la pista).
  useEffect(() => {
    setAbierta(false)
    setYaPedidaAqui(false)
  }, [pista])

  const pedirPista = () => {
    if (yaPedidaAqui) {
      setAbierta((v) => !v)
      return
    }
    if (restantes <= 0) return
    onUsarPista()
    setYaPedidaAqui(true)
    setAbierta(true)
  }

  const sinCupo = restantes <= 0 && !yaPedidaAqui

  return (
    <div className="pistas">
      <button
        className="btn-pista"
        onClick={pedirPista}
        disabled={sinCupo}
        title={sinCupo ? 'Sin pistas disponibles' : 'Pedir pista'}
      >
        💡 Pista{!yaPedidaAqui && <span className="pista-contador"> ({restantes})</span>}
      </button>
      {abierta && (
        <div className="pista-globo" role="status">
          {pista}
        </div>
      )}
    </div>
  )
}
