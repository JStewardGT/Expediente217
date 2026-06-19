# 🏥 Expediente 217

> Escape room web educativo sobre **páncreas exocrino, digestión y malabsorción**.

Los jugadores forman un equipo médico de emergencia que despierta dentro del **Hospital
San Gabriel**, una institución clausurada años atrás tras una serie de casos inexplicables.
Un último paciente sigue conectado al soporte vital. Recorriendo las salas del hospital y
resolviendo 14 retos clínicos, el equipo debe descubrir qué enfermedad lo está consumiendo
y establecer el **diagnóstico definitivo** antes de que el tiempo se agote.

No se "escapa" de una habitación física: se escapa de una **emergencia médica**.

---

## ✨ Características

- 🎮 **14 salas** con progresión lineal (no se avanza sin resolver el reto anterior).
- ⏱️ **Cronómetro** visible en cuenta regresiva (20 minutos). Si llega a cero, el soporte
  vital falla y el juego termina.
- 💡 **Sistema de pistas:** 2 pistas disponibles por equipo.
- 📱 **Diseño móvil primero** (vertical), jugable desde el navegador del celular sin instalar nada.
- 🎨 **Ambientación** de hospital abandonado + laboratorio clandestino (inspiración en
  *Silent Hill* / *Resident Evil*), con paleta oscura, alarmas y efectos atmosféricos.
- 🧩 **6 tipos de mecánica** distintos: selección, candado, respuesta abierta, ordenar
  secuencia, emparejar e imagen interactiva.

---

## 🧬 Contenido educativo

El juego cubre, de forma progresiva, los conceptos del tema:

- Síntomas de malabsorción (esteatorrea, pérdida de peso, diarrea crónica).
- Mala digestión de grasas y vitaminas liposolubles (A, D, E, K).
- Enzimas pancreáticas y sus sustratos (lipasa, amilasa, tripsina).
- Función del bicarbonato pancreático (neutralización del ácido gástrico).
- Anatomía del páncreas (acinos, conducto pancreático, duodeno).
- Secuencia fisiológica de la digestión y absorción.
- Diagnóstico diferencial → **insuficiencia pancreática exocrina**.

---

## 🛠️ Tecnologías

- [React 18](https://react.dev/)
- [Vite 6](https://vite.dev/)
- CSS puro (sin frameworks de estilos)
- Despliegue estático en **GitHub Pages**

Sin backend ni base de datos: todo corre en el navegador.

---

## 🚀 Ejecutar localmente

Requisitos: [Node.js](https://nodejs.org/) 18 o superior.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

### Otros comandos

```bash
npm run build     # genera la versión de producción en dist/
npm run preview   # previsualiza el build de producción localmente
npm run deploy    # publica dist/ en GitHub Pages (rama gh-pages)
```

---

## 🌐 Despliegue (GitHub Pages)

El proyecto está configurado para servirse en el subpath `/Expediente217/`
(ver `base` en `vite.config.js`).

```bash
npm run deploy
```

Luego, en GitHub: **Settings → Pages → Branch: `gh-pages`**.
La app quedará disponible en:

```
https://jstewardgt.github.io/Expediente217/
```

---

## 🏗️ Arquitectura — motor data-driven

El corazón del proyecto es un **motor configurado por datos**. Las 14 salas no se programan
una por una: se definen como objetos en **`src/data/salas.js`**, y el motor renderiza el
componente de mecánica correcto según el campo `tipo` de cada sala.

> **Para cambiar una pregunta, una respuesta o una pista, basta con editar `src/data/salas.js`.**
> No hace falta tocar el código de los componentes.

Ejemplo de una sala:

```js
{
  id: 2,
  nombre: 'Archivo clínico prohibido',
  narrativa: 'Encuentras la historia clínica incompleta…',
  pregunta: '¿Qué nutriente está siendo mal digerido?',
  pista: 'Las vitaminas liposolubles (A, D, E, K) viajan junto a un tipo de nutriente.',
  tipo: 'seleccion',
  multiple: false,
  opciones: ['Grasas', 'Proteínas', 'Carbohidratos', 'Agua'],
  correctas: ['Grasas'],
}
```

### Tipos de mecánica

| `tipo`      | Descripción                                  | Salas              |
|-------------|----------------------------------------------|--------------------|
| `seleccion` | Opción única o múltiple                       | 1, 2, 6, 7, 10, 13 |
| `candado`   | Código numérico de N dígitos                  | 4                  |
| `abierta`   | Respuesta de texto (validación tolerante)     | 11, 14             |
| `secuencia` | Ordenar pasos (tap origen → destino)          | 12                 |
| `emparejar` | Relacionar parejas / memoria                  | 3, 9               |
| `imagen`    | Localizar estructuras sobre una imagen        | 5, 8               |

---

## 📁 Estructura del proyecto

```
Expediente217/
├── index.html
├── vite.config.js          # base de GitHub Pages
├── src/
│   ├── main.jsx            # punto de entrada
│   ├── App.jsx             # motor: máquina de estados + cronómetro + pistas
│   ├── data/
│   │   └── salas.js        # ← contenido de las 14 salas (editable)
│   ├── components/
│   │   ├── Sala.jsx        # dispatcher: tipo → mecánica
│   │   ├── Intro.jsx
│   │   ├── FinalFeliz.jsx
│   │   ├── GameOver.jsx
│   │   ├── Cronometro.jsx
│   │   ├── PanelPistas.jsx
│   │   ├── Seleccion.jsx
│   │   ├── Candado.jsx
│   │   ├── RespuestaAbierta.jsx
│   │   ├── Secuencia.jsx
│   │   └── comun/
│   │       └── Acierto.jsx
│   └── styles/
│       └── theme.css       # paleta y estilos
```

---

## 🗺️ Estado del proyecto

- [x] Motor data-driven, cronómetro y sistema de pistas
- [x] 14 salas cargadas como datos
- [x] Mecánicas: selección, candado, respuesta abierta, secuencia
- [x] Mecánicas: emparejar (tap y memoria) e imagen interactiva
- [ ] Ambientación visual y sonora completa (efectos, audio)
- [ ] Despliegue en GitHub Pages

---

Hecho con 🩺 para fines educativos.
