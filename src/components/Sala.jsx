import Seleccion from './Seleccion.jsx'
import Candado from './Candado.jsx'
import RespuestaAbierta from './RespuestaAbierta.jsx'
import Secuencia from './Secuencia.jsx'

// Dispatcher de salas: lee `sala.tipo` y renderiza la mecánica correspondiente.
// Implementadas (Día 2): seleccion, candado, abierta, secuencia.
// Pendientes (Día 3): emparejar, imagen -> usan el renderizador provisional.
const MECANICAS = {
  seleccion: Seleccion,
  candado: Candado,
  abierta: RespuestaAbierta,
  secuencia: Secuencia,
}

export default function Sala({ sala, onResuelto }) {
  const Mecanica = MECANICAS[sala.tipo]
  return (
    <section className="sala">
      <h2 className="sala-nombre">{sala.nombre}</h2>
      <p className="sala-narrativa">{sala.narrativa}</p>
      <p className="sala-pregunta">{sala.pregunta}</p>

      <div className="sala-mecanica">
        {Mecanica ? (
          <Mecanica sala={sala} onResuelto={onResuelto} />
        ) : (
          <MecanicaProvisional sala={sala} onResuelto={onResuelto} />
        )}
      </div>
    </section>
  )
}

// Provisional para mecánicas aún no construidas (emparejar, imagen).
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
