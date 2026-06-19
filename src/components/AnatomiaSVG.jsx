// Esquema anatómico (vista anterior) de la región pancreática-duodenal.
// Sirve de fondo para la mecánica de imagen interactiva (salas 5 y 8).
// El ESTÓMAGO va etiquetado como ancla de orientación (no es un objetivo);
// las estructuras-objetivo (páncreas, conducto, acinos, duodeno) van sin rótulo
// para que el jugador las identifique. Las coordenadas de los objetivos en
// salas.js están alineadas con este dibujo.
export default function AnatomiaSVG() {
  return (
    <svg
      className="anatomia"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* ---------- ESTÓMAGO (ancla, etiquetado) ---------- */}
      <path
        d="M20 14 C13 18 13 30 21 34 C28 38 39 38 45 33
           C50 29 48 23 51 21 C45 15 39 11 31 11 C27 11 23 12 20 14 Z"
        fill="#3a1a52"
        stroke="#7a55a0"
        strokeWidth="1.1"
        opacity="0.9"
      />
      {/* esófago (entrada) */}
      <path d="M30 11 L28 4" stroke="#7a55a0" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />

      {/* ---------- DUODENO (asa en C, color tubo) ---------- */}
      <path
        d="M51 22 C62 21 71 27 72 40 C73 51 70 61 60 65"
        fill="none"
        stroke="#c79a52"
        strokeWidth="5.5"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* luz interior del duodeno (da sensación de tubo) */}
      <path
        d="M51 22 C62 21 71 27 72 40 C73 51 70 61 60 65"
        fill="none"
        stroke="#5a4520"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="1.5 3"
        opacity="0.8"
      />

      {/* ---------- PÁNCREAS (forma de coma: cabeza en el asa, cola arriba-izq) ---------- */}
      <path
        d="M61 60 C66 55 64 48 57 46 C46 42 32 41 21 40
           C15 39 14 45 20 47 C32 50 47 51 55 56 C58 58 59 60 61 60 Z"
        fill="#27506b"
        stroke="#15c46a"
        strokeWidth="1.2"
        opacity="0.95"
      />

      {/* ---------- CONDUCTO PANCREÁTICO (principal + ramas en espina) ---------- */}
      <g stroke="#9ef0c4" fill="none" opacity="0.95" strokeLinecap="round">
        <path d="M21 44 C35 46 48 50 58 54" strokeWidth="1.6" />
        {/* ramitas (acinos drenando al conducto) */}
        <path d="M30 45 l-3 -3" strokeWidth="0.9" />
        <path d="M38 47 l-3 -3" strokeWidth="0.9" />
        <path d="M46 49 l-3 -3" strokeWidth="0.9" />
        <path d="M34 46 l-2 3" strokeWidth="0.9" />
        <path d="M42 48 l-2 3" strokeWidth="0.9" />
      </g>

      {/* ---------- ACINOS (acercamiento con lupa de la cola del páncreas) ---------- */}
      {/* líneas guía que indican "zoom" desde la cola del páncreas */}
      <g stroke="#15c46a" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.55">
        <line x1="19" y1="45" x2="14" y2="70" />
        <line x1="24" y1="46" x2="35" y2="70" />
      </g>
      {/* círculo de lupa */}
      <circle cx="24" cy="83" r="14" fill="#0d2030" stroke="#15c46a" strokeWidth="1" opacity="0.95" />
      {/* racimo de células acinares (uvas) */}
      <g fill="#1f9d5a" stroke="#9ef0c4" strokeWidth="0.3" opacity="0.95">
        <circle cx="20" cy="79" r="2.8" />
        <circle cx="25" cy="78" r="2.8" />
        <circle cx="29" cy="81" r="2.6" />
        <circle cx="18" cy="84" r="2.6" />
        <circle cx="23" cy="84" r="3" />
        <circle cx="28" cy="86" r="2.6" />
        <circle cx="21" cy="88" r="2.6" />
        <circle cx="26" cy="90" r="2.4" />
      </g>
      {/* conductillo central del acino */}
      <path d="M23 84 L30 92" stroke="#9ef0c4" strokeWidth="0.8" opacity="0.9" />

      {/* ---------- Rótulo ancla ---------- */}
      <text x="30" y="25" fontSize="4.2" fill="#d7dbe0" opacity="0.75" textAnchor="middle">
        Estómago
      </text>
    </svg>
  )
}
