import Seleccion from './Seleccion.jsx'
import Candado from './Candado.jsx'
import RespuestaAbierta from './RespuestaAbierta.jsx'
import Secuencia from './Secuencia.jsx'
import Emparejar from './Emparejar.jsx'
import Reconstruir from './Reconstruir.jsx'

// Dispatcher de salas: lee `sala.tipo` y renderiza la mecánica correspondiente.
const MECANICAS = {
  seleccion: Seleccion,
  candado: Candado,
  abierta: RespuestaAbierta,
  secuencia: Secuencia,
  emparejar: Emparejar,
  reconstruir: Reconstruir,
}

export default function Sala({ sala, onResuelto }) {
  const Mecanica = MECANICAS[sala.tipo]
  const contenido = Mecanica ? (
    <Mecanica sala={sala} onResuelto={onResuelto} />
  ) : (
    <p className="feedback-error">Mecánica no reconocida: {sala.tipo}</p>
  )

  // Salas cuyo asset ya trae su propio título/instrucción: se omite el encabezado.
  if (sala.pantallaCompleta) {
    return (
      <section className="sala sala-completa">
        <div className="sala-mecanica">{contenido}</div>
      </section>
    )
  }

  return (
    <section className="sala">
      <h2 className="sala-nombre">{sala.nombre}</h2>
      <p className="sala-narrativa">{sala.narrativa}</p>
      <p className="sala-pregunta">{sala.pregunta}</p>

      <div className="sala-mecanica">{contenido}</div>
    </section>
  )
}
