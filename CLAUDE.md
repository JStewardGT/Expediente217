# CLAUDE.md

Guía para trabajar en este repositorio.

## Qué es esto

Escape room **web educativo** llamado **"Expediente 217"**, sobre el tema de bioquímica/fisiología
**Páncreas exocrino, digestión y malabsorción**. Es un encargo académico: los jugadores actúan como
un equipo médico que recorre un hospital abandonado resolviendo 14 retos para diagnosticar a un paciente.

- **Documento de diseño del cliente:** `Scape Room .md` (contenido de las 14 salas, respuestas, tema visual).
- **Plan de acción y cronograma:** `PLAN-DE-ACCION.md`.

## Stack y decisiones

- **Frontend:** React + Vite
- **Deploy:** GitHub Pages, repo `JStewardGT/Expediente217` (sirve en subpath `/Expediente217/` → ya configurado en `vite.config.js`)
- **Sin backend:** sitio estático, sin usuarios, sin puntajes persistentes
- **Móvil primero:** diseño vertical (portrait), pensado para celular
- **Drag en móvil:** patrón **tap origen → tap destino** (NO drag nativo — da bugs en touch)

## Principio de arquitectura: motor data-driven

Las 14 salas NO se programan una por una. Se definen como **datos** en un archivo de config
(`salas.js` / `salas.ts`), y un motor central renderiza el componente de mecánica correcto según
el `tipo` de cada sala. Agregar o cambiar una sala = editar datos, no escribir componentes nuevos.

Mecánicas reutilizables (un componente por patrón):

| Tipo | Salas | Descripción |
|---|---|---|
| `seleccion` | 1, 2, 6, 7, 10, 13 | Opción única/múltiple (los "casos clínicos" son selección con texto largo) |
| `emparejar` | 3, 9 | Tap origen → tap destino / memoria |
| `candado` | 4 | Teclado numérico de 4 dígitos |
| `imagen` | 5, 8 | Zonas tocables sobre una imagen anatómica |
| `abierta` | 11, 14 | Input de texto con validación tolerante |
| `secuencia` | 12 | Ordenar pasos |

El motor también maneja: progresión **lineal** (no se avanza sin resolver), **cronómetro** visible,
y **2 pistas** por equipo.

## Restricción de diseño importante

El cliente pidió que **no se note que fue "mandado a hacer"** por un profesional. Mantener estética
fuerte pero **sobria**: buen CSS, sin librerías de animación llamativas ni apariencia de plantilla
comercial. Usar la paleta y efectos definidos en `Scape Room .md`.

## Convenciones

- El proyecto y el contenido están en **español** — mantener textos, comentarios de UI y nombres
  de salas en español.
- Validación de respuestas: tolerante a mayúsculas/acentos/espacios en respuestas abiertas.

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo local
npm run build    # build de producción
npm run preview  # previsualizar el build
npm run deploy   # publicar a GitHub Pages (se configurará en el cronograma)
```
