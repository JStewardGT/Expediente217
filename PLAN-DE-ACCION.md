# Plan de Acción — Escape Room "Expediente 217"

> Proyecto: escape room web educativo sobre **Páncreas exocrino, digestión y malabsorción**.
> Entrega: **23 de junio**. Plan trazado el 19 de junio (4 días + buffer).

---

## Decisiones cerradas

- **Stack:** React + Vite
- **Deploy:** GitHub Pages
- **Drag en móvil:** tap origen → tap destino (robusto, sin bugs de touch)
- **Sin backend:** sitio estático, sin usuarios ni puntajes guardados
- **Plataforma:** web responsive, móvil vertical

---

## Lectura del proyecto

Lo documentado en `Scape Room .md` es ambicioso: **14 salas con ~8 mecánicas distintas**,
15-20 min, cronómetro, sistema de pistas y temática visual fuerte
(Silent Hill / Resident Evil / Among Us). Aunque hay que recordar el requisito del cliente
de que **no se vea "mandado a hacer"** → estética fuerte pero sobria, nada de plantillas
comerciales evidentes.

**Insight clave:** las 14 salas no son 14 juegos distintos. Las mecánicas se repiten →
~7 patrones reutilizables configurados con datos.

| Patrón reutilizable | Salas que lo usan | Mecánica |
|---|---|---|
| **Selección (única/múltiple)** | 1, 2, 6, 7, 10, 13 | Botones de opción, valida y avanza |
| **Emparejar (drag & memoria)** | 3, 9 | Tap origen → tap destino / voltear cartas |
| **Candado numérico** | 4 | Teclado de 4 dígitos |
| **Ubicar sobre imagen** | 5, 8 | Tocar regiones de una imagen (anatomía) |
| **Respuesta abierta** | 11, 14 | Input de texto, validación tolerante |
| **Ordenar secuencia** | 12 | Reordenar pasos (tap) |

> Las salas 7, 10 y 13 ("caso clínico/análisis") son en el fondo **selección con texto largo**
> → mismo componente.

---

## Arquitectura

- **Motor data-driven:** un solo array `salas.js` define las 14 salas (tipo + contenido + respuesta).
  El motor renderiza el componente de mecánica correcto. Cambiar una sala = editar datos, no programar.
- **Máquina de estados:** `sala actual → resolver → desbloquear → siguiente`, con cronómetro
  global y contador de 2 pistas.
- **Estructura:**
  - `salas.js` → config de las 14 salas (contenido ya está en el `.md`)
  - Componentes de mecánica (los ~6 de la tabla)
  - Capa de tema global (colores, sonido, efectos)

### Notas técnicas (derivadas del stack)

- GitHub Pages sirve en subpath (`usuario.github.io/ScapeRoom/`) → configurar `base` en Vite
  y usar navegación por estado/hash, no rutas de servidor.
- El repo aún no es git → `git init` + crear repo remoto (incluido en Día 1).

---

## Riesgos a vigilar (móvil vertical)

1. **Drag & drop en celular** (salas 3, 5, 12): resuelto con mecánica **tap origen → tap destino**.
2. **Búsqueda de objetos / rompecabezas anatómico** (salas 5, 8): lo más caro. Simplificación
   segura → imagen con **zonas tocables** que se iluminan al acertar. Conserva el objetivo didáctico.
3. **"Casero" vs. spec elaborado:** CSS bueno pero sin librerías de animación pro; evitar
   apariencia de plantilla comercial.

---

## Tema visual y efectos

- **Paleta** (del `.md`) → variables CSS:
  - Azul oscuro / negro / gris oscuro (fondos)
  - Verde esmeralda (interactivos)
  - Blanco tenue (texto)
  - Amarillo (pistas)
  - Rojo intenso (alarmas / peligro)
  - Morado oscuro (misterio)
- **Efectos de alto impacto / bajo costo:** parpadeo de luces (CSS), niebla / scanlines (CSS),
  sonido de monitor cardíaco y alarma (audio HTML5 en loop).

---

## Cronograma (19 → 23 junio)

| Día | Entregable |
|---|---|
| **19 (hoy)** | Scaffold React+Vite, `git init` + repo en GitHub, motor data-driven, las 14 salas como datos, cronómetro y sistema de 2 pistas |
| **20** | Mecánicas: selección, candado, respuesta abierta, ordenar secuencia → 9/14 salas jugables |
| **21** | Mecánicas duras: emparejar (tap) + imagen interactiva (anatomía/objetos) → 14/14 jugables |
| **22** | Tema visual completo, sonido, intro/historia, pantalla final, prueba en celular real, primer deploy a GitHub Pages |
| **23** | Buffer, ajustes finales, entrega del link |

---

## Entregables

1. Link web jugable en celular (vertical).
2. Las 14 salas, cronómetro, 2 pistas, progresión lineal.
3. (Opcional) Código entregado por si la profe lo pide.
