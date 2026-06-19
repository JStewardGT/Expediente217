// Dispatcher de salas: lee `sala.tipo` y renderiza la mecánica correspondiente.
// DÍA 1: marco de la sala + mecánica PROVISIONAL (botón de resolver).
// DÍA 2-3: reemplazar el bloque "MecanicaProvisional" por los componentes reales:
//   seleccion -> <Seleccion/>, emparejar -> <Emparejar/>, candado -> <Candado/>,
//   imagen -> <ImagenInteractiva/>, abierta -> <RespuestaAbierta/>, secuencia -> <Secuencia/>.

export default function Sala({ sala, onResuelto }) {
  return (
    <section className="sala">
      <h2 className="sala-nombre">{sala.nombre}</h2>
      <p className="sala-narrativa">{sala.narrativa}</p>
      <p className="sala-pregunta">{sala.pregunta}</p>

      <div className="sala-mecanica">
        <MecanicaProvisional sala={sala} onResuelto={onResuelto} />
      </div>
    </section>
  )
}

// --- Provisional (Día 1) -----------------------------------------------------
// Permite recorrer y validar el flujo de las 14 salas mientras se construyen
// las mecánicas reales. Muestra el tipo de mecánica que irá en cada sala.
function MecanicaProvisional({ sala, onResuelto }) {
  return (
    <div className="provisional">
      <span className="provisional-etiqueta">
        Mecánica pendiente: <code>{sala.tipo}</code>
      </span>
      <button className="btn-principal" onClick={onResuelto}>
        {sala.esFinal ? 'Establecer diagnóstico' : 'Resolver reto'}
      </button>
    </div>
  )
}
