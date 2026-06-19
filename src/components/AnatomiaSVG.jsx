// Esquema anatómico de la región pancreática/duodenal (viewBox 0..100).
// Sirve de fondo para la mecánica de imagen interactiva. En el Día 4 puede
// reemplazarse por una ilustración o imagen real sin tocar la lógica del juego.
// Las coordenadas de los objetivos en salas.js están alineadas con este dibujo.
export default function AnatomiaSVG() {
  return (
    <svg
      className="anatomia"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Estómago (forma de J, arriba a la izquierda) */}
      <path
        d="M18 14 q22 -4 26 12 q3 14 -8 20 q-12 4 -14 -8 q-2 -18 -4 -24 z"
        fill="#3a1a52"
        stroke="#5a3a72"
        strokeWidth="1"
        opacity="0.85"
      />

      {/* Páncreas (cuerpo alargado en diagonal) */}
      <path
        d="M24 50 q18 -8 38 4 q8 5 14 9 q-4 6 -12 4 q-22 -10 -40 -7 q-4 0 0 -10 z"
        fill="#2a3550"
        stroke="#15c46a"
        strokeWidth="1.2"
        opacity="0.9"
      />

      {/* Conducto pancreático (línea que recorre el páncreas) */}
      <path
        d="M28 50 q16 -2 30 6 q6 3 12 7"
        fill="none"
        stroke="#15c46a"
        strokeWidth="1.4"
        strokeDasharray="2 2"
        opacity="0.9"
      />

      {/* Acinos pancreáticos (racimo en la cola, izquierda) */}
      <g fill="#1f7d4a" stroke="#15c46a" strokeWidth="0.4" opacity="0.9">
        <circle cx="25" cy="44" r="2.4" />
        <circle cx="29" cy="47" r="2.4" />
        <circle cx="24" cy="49" r="2.2" />
        <circle cx="30" cy="43" r="2" />
        <circle cx="27" cy="40" r="2" />
      </g>

      {/* Duodeno (asa en C a la derecha) */}
      <path
        d="M72 44 q12 2 12 16 q0 14 -12 16"
        fill="none"
        stroke="#7a6a3a"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}
