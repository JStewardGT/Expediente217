import Seleccion from './Seleccion.jsx'
import Candado from './Candado.jsx'
import RespuestaAbierta from './RespuestaAbierta.jsx'
import Secuencia from './Secuencia.jsx'
import Emparejar from './Emparejar.jsx'
import ImagenInteractiva from './ImagenInteractiva.jsx'

// Dispatcher de salas: lee `sala.tipo` y renderiza la mecánica correspondiente.
// Las 6 mecánicas están implementadas.
const MECANICAS = {
  seleccion: Seleccion,
  candado: Candado,
  abierta: RespuestaAbierta,
  secuencia: Secuencia,
  emparejar: Emparejar,
  imagen: ImagenInteractiva,
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
          <p className="feedback-error">Mecánica no reconocida: {sala.tipo}</p>
        )}
      </div>
    </section>
  )
}
