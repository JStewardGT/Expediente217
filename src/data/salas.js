// =============================================================================
//  EXPEDIENTE 217 — Configuración de las 14 salas (motor data-driven)
// -----------------------------------------------------------------------------
//  Cada sala define: identidad + narrativa + pregunta + PISTA + mecánica.
//  El motor (App.jsx) lee `tipo` y renderiza el componente de mecánica correcto.
//  Tipos: seleccion | emparejar | candado | imagen | abierta | secuencia | reconstruir
//  Contenido basado en `Scape Room .md`.
// =============================================================================

// Assets de la sala 5 (arrastrar para reconstruir)
import sala5Fondo from '../assets/sala5/sala5-fondo.jpg'
import sala5Acinos from '../assets/sala5/sala5-acinos.png'
import sala5Conducto from '../assets/sala5/sala5-conducto.png'
import sala5Duodeno from '../assets/sala5/sala5-duodeno.png'

// Assets de la sala 8 (tocar para localizar)
import sala8Fondo from '../assets/sala8/sala8-fondo.jpg'
import sala8Pancreas from '../assets/sala8/sala8-pancreas.png'
import sala8Conducto from '../assets/sala8/sala8-conducto.png'
import sala8Duodeno from '../assets/sala8/sala8-duodeno.png'

// Asset de la sala 4 (escena con letreros de neón sobre los que se descubren las pistas)
import sala4Fondo from '../assets/sala4/sala4-fondo.png'

export const PACIENTE = {
  nombre: 'Carlos Eduardo Ramírez Corrales',
  edad: 42,
  sintomas: [
    'Dolor abdominal',
    'Pérdida de peso',
    'Diarrea crónica',
    'Heces grasosas (esteatorrea)',
    'Fatiga y desnutrición',
  ],
}

export const INTRO = {
  titulo: 'EXPEDIENTE 217',
  hospital: 'Hospital San Gabriel',
  historia: [
    'Hace varios años, el Hospital San Gabriel cerró sus puertas tras una serie de casos inexplicables.',
    'Se rumorea que un paciente permanece atrapado en el último piso, conectado a máquinas que nadie se atrevió a apagar.',
    'Un mensaje de emergencia acaba de llegar a tu equipo. Son especialistas en gastroenterología y diagnóstico clínico.',
    'Tienen el tiempo contado para recorrer el hospital, descifrar las pistas y descubrir qué consume al paciente antes de que el soporte vital falle por completo.',
  ],
  mision: 'Salvar al paciente estableciendo el diagnóstico correcto.',
}

export const CONFIG = {
  duracionMinutos: 18, // cronómetro visible
  pistasDisponibles: 2, // pistas por equipo
}

export const FINAL = {
  diagnostico: 'INSUFICIENCIA PANCREÁTICA EXOCRINA',
  mensajes: [
    'Paciente estabilizado.',
    'Digestión restaurada.',
    'Deficiencias nutricionales corregidas.',
    'El equipo logró identificar la causa de la malabsorción y administrar el tratamiento oportuno, salvando la vida del paciente.',
  ],
  titulo: 'MISIÓN COMPLETADA',
}

export const SALAS = [
  // ---- SALA 1 ----------------------------------------------------------------
  {
    id: 1,
    nombre: 'Recepción abandonada',
    narrativa:
      'La electricidad es inestable y el monitor cardíaco emite una alarma. Sobre el mostrador hay una ficha de admisión con síntomas dispersos.',
    pregunta:
      'Selecciona los síntomas que apuntan a un trastorno digestivo con malabsorción.',
    pista: 'Piensa en signos de mala digestión de grasas y pérdida de nutrientes, no en signos respiratorios o neurológicos.',
    tipo: 'seleccion',
    multiple: true,
    opciones: [
      'Esteatorrea',
      'Pérdida de peso',
      'Diarrea crónica',
      'Cefalea intensa',
      'Visión borrosa',
      'Tos seca',
    ],
    correctas: ['Esteatorrea', 'Pérdida de peso', 'Diarrea crónica'],
    recompensa: 'Se desbloquea el expediente médico del paciente.',
  },

  // ---- SALA 2 ----------------------------------------------------------------
  {
    id: 2,
    nombre: 'Archivo clínico prohibido',
    narrativa:
      'Encuentras la historia clínica incompleta: "Paciente con heces flotantes y deficiencia de vitaminas liposolubles."',
    pregunta: '¿Qué nutriente está siendo mal digerido?',
    pista: 'Las vitaminas liposolubles (A, D, E, K) viajan junto a un tipo de nutriente. Las heces flotantes delatan cuál.',
    tipo: 'seleccion',
    multiple: false,
    opciones: ['Grasas', 'Proteínas', 'Carbohidratos', 'Agua'],
    correctas: ['Grasas'],
  },

  // ---- SALA 3 ----------------------------------------------------------------
  {
    id: 3,
    nombre: 'Laboratorio de enzimas',
    narrativa:
      'En el antiguo laboratorio aparecen tres frascos rotulados con nombres incompletos. Hay que relacionar cada enzima con su sustrato.',
    pregunta: 'Relaciona cada enzima pancreática con lo que digiere.',
    pista: 'La raíz del nombre delata el sustrato: lip- (grasas), amil- (almidón/carbohidratos).',
    tipo: 'emparejar',
    modo: 'tap',
    pares: [
      { izq: 'Lipasa', der: 'Grasas' },
      { izq: 'Amilasa', der: 'Carbohidratos' },
      { izq: 'Tripsina', der: 'Proteínas' },
    ],
    recompensa: 'Obtienes una llave digital.',
  },

  // ---- SALA 4 ----------------------------------------------------------------
  {
    id: 4,
    nombre: 'Sala del bicarbonato',
    narrativa:
      'Una puerta oxidada bloquea el paso. En la pared parpadean tres letreros de neón; cada uno esconde una palabra del enunciado y un dígito del código.',
    pregunta: 'Toca los tres letreros para descubrir el código y abrir la puerta.',
    pista: 'Cada letrero revela una palabra y un dígito. Tócalos en cualquier orden; en el teclado, el código va en el orden del enunciado.',
    tipo: 'candado',
    longitud: 3,
    codigo: '327',
    imagenFondo: sala4Fondo,
    imagenAspecto: '1408 / 768',
    // Enunciado con huecos: cada hueco se llena al descubrir su pista interactiva.
    enunciado: {
      partes: [
        'El ',
        ' neutraliza el ácido en el ',
        ' y permite que las enzimas funcionen en un pH cercano a ',
        '.',
      ],
    },
    // posicion en % del lienzo (centro x/y y tamaño ancho/alto del área tocable)
    pistasInteractivas: [
      {
        id: 'laboratorio',
        nombre: 'Cartel LABORATORIO',
        palabra: 'bicarbonato',
        digito: '3',
        posicion: { x: 21.5, y: 42, ancho: 12, alto: 38 },
      },
      {
        id: 'duodeno',
        nombre: 'Cartel DUODENO',
        palabra: 'duodeno',
        digito: '2',
        posicion: { x: 67, y: 42, ancho: 12, alto: 38 },
      },
      {
        id: 'ph',
        nombre: 'Cartel pH',
        palabra: '7',
        digito: '7',
        posicion: { x: 82, y: 40, ancho: 12, alto: 34 },
      },
    ],
  },

  // ---- SALA 5 ----------------------------------------------------------------
  {
    id: 5,
    nombre: 'Sala de anatomía olvidada',
    narrativa:
      'El páncreas quedó incompleto. En la bandeja están las piezas que faltan: hay que reconstruirlo.',
    pregunta: 'Arrastra cada estructura a su lugar para reconstruir el páncreas.',
    pista: 'El conducto pancreático recorre el centro del órgano; los acinos son los racimos; el duodeno es el asa que abraza la cabeza del páncreas.',
    tipo: 'reconstruir',
    fondo: sala5Fondo,
    fondoAspecto: '988 / 1024', // ancho / alto del fondo
    tolerancia: 9, // % de cercanía para que la pieza "encaje"
    recompensa: 'Anatomía reconstruida. El expediente continúa.',
    // NOTA: posiciones `destino` provisionales — se afinan con el fondo de huecos.
    piezas: [
      { id: 'acinos', nombre: 'Acinos pancreáticos', img: sala5Acinos, ancho: 33.2, destino: { x: 44, y: 48 } },
      { id: 'conducto', nombre: 'Conducto pancreático', img: sala5Conducto, ancho: 36.9, destino: { x: 63, y: 43 } },
      { id: 'duodeno', nombre: 'Duodeno', img: sala5Duodeno, ancho: 51.7, destino: { x: 33, y: 50 } },
    ],
  },

  // ---- SALA 6 ----------------------------------------------------------------
  {
    id: 6,
    nombre: 'Unidad de cuidados intensivos',
    narrativa:
      'El estado del paciente empeora. Nuevo hallazgo en los exámenes: déficit de vitamina K.',
    pregunta: '¿Qué función corporal se verá afectada?',
    pista: 'La vitamina K es indispensable para fabricar varios factores de un proceso que detiene las hemorragias.',
    tipo: 'seleccion',
    multiple: false,
    opciones: [
      'La coagulación sanguínea',
      'La visión nocturna',
      'La contracción muscular',
      'La memoria',
    ],
    correctas: ['La coagulación sanguínea'],
  },

  // ---- SALA 7 ----------------------------------------------------------------
  {
    id: 7,
    nombre: 'Laboratorio de coprológicos',
    narrativa:
      'Los resultados muestran exceso de grasa en heces y restos alimenticios no digeridos.',
    pregunta: '¿Cuál es el trastorno más probable?',
    pista: 'Si el páncreas no libera suficientes enzimas, la comida no se digiere: grasa y restos salen en las heces.',
    tipo: 'seleccion',
    multiple: false,
    opciones: [
      'Insuficiencia pancreática exocrina',
      'Intolerancia a la lactosa',
      'Úlcera gástrica',
      'Colon irritable',
    ],
    correctas: ['Insuficiencia pancreática exocrina'],
  },

  // ---- SALA 8 ----------------------------------------------------------------
  {
    id: 8,
    nombre: 'El conducto prohibido',
    narrativa:
      'En una imagen del abdomen, ocultas entre las sombras, debes encontrar tres estructuras.',
    pregunta: 'Arrastra cada estructura a su lugar en el abdomen.',
    pista: 'El páncreas está detrás del estómago; su conducto sale hacia el duodeno, el asa en C de la primera porción del intestino delgado.',
    tipo: 'reconstruir',
    pantallaCompleta: true, // el fondo ya trae título/instrucción: se oculta el encabezado del juego
    fondo: sala8Fondo,
    fondoAspecto: '877 / 1024', // ancho / alto del fondo
    tolerancia: 10, // % de cercanía para que la pieza "encaje"
    recompensa: 'Estructuras ubicadas. El expediente continúa.',
    // NOTA: posiciones `destino` provisionales — se afinan visualmente contra el fondo.
    piezas: [
      { id: 'pancreas', nombre: 'Páncreas', img: sala8Pancreas, ancho: 67.8, destino: { x: 53, y: 54 } },
      { id: 'conducto', nombre: 'Conducto pancreático', img: sala8Conducto, ancho: 63.1, destino: { x: 50, y: 54 } },
      { id: 'duodeno', nombre: 'Duodeno', img: sala8Duodeno, ancho: 43.0, destino: { x: 30, y: 60 } },
    ],
  },

  // ---- SALA 9 ----------------------------------------------------------------
  {
    id: 9,
    nombre: 'La biblioteca perdida',
    narrativa:
      'Antiguas tarjetas médicas están desordenadas boca abajo. Encuentra las parejas.',
    pregunta: 'Empareja cada elemento con su función o sustrato.',
    pista: 'Repasa lo visto en el laboratorio de enzimas y recuerda qué hace el bicarbonato.',
    tipo: 'emparejar',
    modo: 'memoria',
    pares: [
      { izq: 'Lipasa', der: 'Lípidos' },
      { izq: 'Amilasa', der: 'Almidón' },
      { izq: 'Tripsina', der: 'Proteínas' },
      { izq: 'Bicarbonato', der: 'Neutralización del ácido' },
    ],
  },

  // ---- SALA 10 ---------------------------------------------------------------
  {
    id: 10,
    nombre: 'Ala de malabsorción',
    narrativa:
      'El expediente revela esteatorrea, pérdida de peso y deficiencia de vitaminas A, D, E y K.',
    pregunta: '¿Qué tipo de absorción está comprometida?',
    pista: 'Las vitaminas A, D, E y K comparten una característica: son liposolubles. ¿Qué necesitan para absorberse?',
    tipo: 'seleccion',
    multiple: false,
    opciones: [
      'Absorción de grasas',
      'Absorción de agua',
      'Absorción de hierro',
      'Absorción de glucosa',
    ],
    correctas: ['Absorción de grasas'],
  },

  // ---- SALA 11 ---------------------------------------------------------------
  {
    id: 11,
    nombre: 'Expediente 217',
    narrativa:
      'Descubres registros de la infancia del paciente: infecciones respiratorias recurrentes desde niño, sumadas al cuadro digestivo actual.',
    pregunta: '¿Qué enfermedad puede explicar todo el cuadro? (escribe tu respuesta)',
    pista: 'Es una enfermedad genética que afecta a la vez los pulmones y el páncreas, espesando las secreciones.',
    tipo: 'abierta',
    respuestasAceptadas: ['fibrosis quistica', 'fibrosis quística', 'fq'],
  },

  // ---- SALA 12 ---------------------------------------------------------------
  {
    id: 12,
    nombre: 'Túnel digestivo',
    narrativa:
      'Los procesos fisiológicos aparecen mezclados en el túnel. Ordénalos para avanzar.',
    pregunta: 'Ordena los pasos de la digestión en la secuencia correcta.',
    pista: 'Empieza donde llega la comida desde el esófago y termina cuando los nutrientes pasan a la sangre.',
    tipo: 'secuencia',
    // Orden CORRECTO (el componente baraja para presentar):
    pasos: [
      'Estómago',
      'Duodeno',
      'Liberación de enzimas pancreáticas',
      'Digestión',
      'Absorción intestinal',
    ],
  },

  // ---- SALA 13 ---------------------------------------------------------------
  {
    id: 13,
    nombre: 'Diagnósticos perdidos',
    narrativa:
      'Tres expedientes aparecen sobre una mesa. Solo uno explica TODOS los signos y síntomas del paciente.',
    pregunta: '¿Cuál diagnóstico explica el cuadro completo?',
    pista: 'Gastritis y apendicitis no explican la esteatorrea ni el déficit de vitaminas liposolubles. Solo uno integra todo.',
    tipo: 'seleccion',
    multiple: false,
    opciones: ['Gastritis', 'Apendicitis', 'Insuficiencia pancreática exocrina'],
    correctas: ['Insuficiencia pancreática exocrina'],
  },

  // ---- SALA 14 (FINAL) -------------------------------------------------------
  {
    id: 14,
    nombre: 'Habitación 217',
    narrativa:
      'Las luces se apagan y solo queda encendido el monitor del paciente. Es el momento del diagnóstico definitivo.',
    pregunta: '¿Cuál es el diagnóstico definitivo del paciente? (escribe tu respuesta)',
    pista: 'Reúne todo: enzimas insuficientes, esteatorrea, déficit de vitaminas liposolubles. El páncreas exocrino falla.',
    tipo: 'abierta',
    esFinal: true,
    respuestasAceptadas: [
      'insuficiencia pancreatica exocrina',
      'insuficiencia pancreática exocrina',
      'ipe',
    ],
  },
]
