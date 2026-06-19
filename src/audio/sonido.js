// =============================================================================
//  Sonido sintetizado con Web Audio API (sin archivos de audio).
//  Efectos: monitor cardíaco, alarma, acierto y error.
//  Los navegadores bloquean el audio hasta una interacción del usuario:
//  por eso iniciarAudio() se llama al pulsar "INGRESAR" en la intro.
// =============================================================================

let ctx = null
let silenciado = false

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (AC) ctx = new AC()
  }
  return ctx
}

export function iniciarAudio() {
  const c = getCtx()
  if (c && c.state === 'suspended') c.resume()
}

export function setSilenciado(v) {
  silenciado = v
}

// Genera un tono breve con envolvente (ataque rápido, caída exponencial).
function tono({ freq = 440, dur = 0.15, tipo = 'sine', vol = 0.15, cuando = 0 }) {
  const c = getCtx()
  if (!c || silenciado) return
  const t0 = c.currentTime + cuando
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = tipo
  osc.frequency.value = freq
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.linearRampToValueAtTime(vol, t0 + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.03)
}

// Pitido suave del monitor cardíaco.
export function sonarLatido() {
  tono({ freq: 880, dur: 0.07, tipo: 'sine', vol: 0.05 })
}

// Doble pitido de alarma (cuando el tiempo es crítico).
export function sonarAlarma() {
  tono({ freq: 740, dur: 0.16, tipo: 'square', vol: 0.08 })
  tono({ freq: 740, dur: 0.16, tipo: 'square', vol: 0.08, cuando: 0.22 })
}

// Acierto: dos notas ascendentes.
export function sonarAcierto() {
  tono({ freq: 523, dur: 0.12, vol: 0.1 })
  tono({ freq: 784, dur: 0.18, vol: 0.1, cuando: 0.1 })
}

// Error: tono grave y áspero.
export function sonarError() {
  tono({ freq: 150, dur: 0.28, tipo: 'sawtooth', vol: 0.1 })
}
