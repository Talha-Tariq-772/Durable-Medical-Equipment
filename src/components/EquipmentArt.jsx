import { motion, useReducedMotion } from 'framer-motion'

/**
 * Hand-drawn "patent plate" line art. Each stroke draws itself when the plate
 * scrolls into view. All drawings share a 240 x 200 viewBox.
 */
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.01, delay: i * 0.05 },
    },
  }),
}

/** Circle written as a path so it animates exactly like every other stroke. */
const ring = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`

const spokes = (cx, cy, r, n = 10) =>
  Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2
    return `M${cx} ${cy}L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`
  }).join('')

const ground = (y = 184) => ({ d: `M14 ${y}H226`, thin: true })

const art = {
  wheelchair: [
    { d: ring(132, 138, 44) },
    { d: ring(132, 138, 38), thin: true },
    { d: spokes(132, 138, 38, 14), thin: true },
    { d: ring(132, 138, 5), accent: true },
    { d: ring(70, 170, 12) },
    { d: ring(70, 170, 2.5), thin: true },
    { d: 'M72 104H154a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5H76a5 5 0 0 1-5-5v-5z' },
    { d: 'M154 104L164 46a7 7 0 0 1 7-5h18' },
    { d: 'M146 104L155 50', thin: true },
    { d: 'M92 78H152' },
    { d: 'M94 78V104' },
    { d: 'M84 115L70 158' },
    { d: 'M76 115L46 156H22' },
    { d: 'M158 115L150 150', thin: true },
    ground(),
  ],
  rollator: [
    { d: ring(58, 170, 14) },
    { d: ring(58, 170, 3), accent: true },
    { d: ring(178, 170, 14) },
    { d: ring(178, 170, 3), accent: true },
    { d: 'M58 170L108 44' },
    { d: 'M178 170L132 44' },
    { d: 'M92 40H146a6 6 0 0 1 0 12' },
    { d: 'M92 40a6 6 0 0 0 0 12h8', thin: true },
    { d: 'M80 106H158a6 6 0 0 1 6 6H74a6 6 0 0 1 6-6z' },
    { d: 'M86 122H154L148 148H92z', thin: true },
    { d: 'M86 131H152M90 140H150', thin: true },
    { d: 'M146 52C168 62 166 96 152 126', thin: true, accent: true },
    ground(),
  ],
  'hospital-bed': [
    { d: 'M30 112V56' },
    { d: 'M30 62H42V112', thin: true },
    { d: 'M212 118V38a6 6 0 0 0-6-6h-6a6 6 0 0 0-6 6v50' },
    { d: 'M42 112H132L192 74' },
    { d: 'M42 96H128L186 60a5 5 0 0 1 7 2l3 8' },
    { d: 'M42 96V112', thin: true },
    { d: 'M30 118H212' },
    { d: 'M70 92V78H124V92M97 78V92', thin: true },
    { d: 'M72 118L160 164M160 118L72 164' },
    { d: ring(116, 141, 3), accent: true },
    { d: 'M50 164H182' },
    { d: ring(58, 174, 9) },
    { d: ring(174, 174, 9) },
    ground(),
  ],
  'patient-lift': [
    { d: 'M34 172H170' },
    { d: 'M70 172V54a10 10 0 0 1 10-10' },
    { d: 'M60 42H172' },
    { d: 'M78 124L120 44', thin: true },
    { d: 'M80 118L104 72', accent: true },
    { d: 'M166 42V66' },
    { d: 'M134 72H198' },
    { d: ring(166, 69, 3.5), accent: true },
    { d: 'M136 72C136 104 142 132 164 138C186 132 196 104 196 72', thin: true },
    { d: 'M144 112C154 124 178 124 188 112', thin: true },
    { d: ring(44, 178, 6) },
    { d: ring(90, 178, 6) },
    { d: ring(160, 178, 6) },
    ground(),
  ],
  'overbed-table': [
    { d: 'M46 62H196a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H46a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4z' },
    { d: 'M60 74V168' },
    { d: 'M70 74V168', thin: true },
    { d: 'M72 96H60', accent: true },
    { d: 'M28 168H184' },
    { d: ring(36, 177, 7) },
    { d: ring(112, 177, 7) },
    { d: ring(176, 177, 7) },
    { d: 'M120 38H156V44C156 54 150 62 138 62C126 62 120 54 120 44z', thin: true },
    { d: 'M156 42h6a6 6 0 0 1 0 12h-8', thin: true },
    ground(),
  ],
  oxygen: [
    { d: 'M82 44a14 14 0 0 1 14-14h40a14 14 0 0 1 14 14v116a12 12 0 0 1-12 12H94a12 12 0 0 1-12-12z' },
    { d: 'M100 30V22a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v8' },
    { d: 'M96 46H136V70H96z', thin: true },
    { d: 'M100 60H108L111 52L116 66L120 60H132', accent: true, thin: true },
    { d: ring(116, 94, 12) },
    { d: 'M116 94L123 86', accent: true },
    { d: 'M94 124H138M94 132H138M94 140H138M94 148H138M94 156H138', thin: true },
    { d: ring(98, 178, 6) },
    { d: ring(134, 178, 6) },
    { d: 'M150 104C182 100 214 112 208 136C203 156 172 150 182 128C190 110 218 96 216 60', thin: true },
    { d: 'M198 58C206 72 226 72 234 58' },
    ground(),
  ],
  cpap: [
    { d: 'M30 132a12 12 0 0 1 12-12h76a12 12 0 0 1 12 12v32a12 12 0 0 1-12 12H42a12 12 0 0 1-12-12z' },
    { d: 'M130 138H150a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H130' },
    { d: 'M130 152H158', thin: true },
    { d: 'M44 134H86V156H44z', thin: true },
    { d: 'M50 146H58L61 140L66 152L70 146H80', accent: true, thin: true },
    { d: ring(106, 146, 9) },
    { d: 'M74 120C72 74 112 58 146 74C160 80 172 84 182 80' },
    { d: 'M182 62C198 58 214 72 216 92C208 100 192 102 182 96C176 86 176 70 182 62z' },
    { d: 'M190 62C194 44 214 36 226 44M200 100C210 112 222 112 232 106', thin: true },
    ground(176),
  ],
  nebulizer: [
    { d: 'M26 130a12 12 0 0 1 12-12h80a12 12 0 0 1 12 12v34a12 12 0 0 1-12 12H38a12 12 0 0 1-12-12z' },
    { d: 'M42 150H114M42 158H114M42 166H114', thin: true },
    { d: ring(50, 132, 6), accent: true },
    { d: 'M72 128H112', thin: true },
    { d: 'M118 118C118 84 150 92 164 110' },
    { d: 'M158 110H184L178 142H164z' },
    { d: 'M162 124H180', thin: true },
    { d: 'M171 110V88' },
    { d: 'M150 88C160 66 182 66 192 88C192 96 150 96 150 88z' },
    { d: 'M158 52a3 3 0 0 0 6 0M172 40a3 3 0 0 0 6 0M184 54a3 3 0 0 0 6 0', thin: true, accent: true },
    ground(176),
  ],
  'shower-chair': [
    { d: 'M58 106H182a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6H58a6 6 0 0 1-6-6v-2a6 6 0 0 1 6-6z' },
    { d: 'M78 113h.1M98 113h.1M118 113h.1M138 113h.1M158 113h.1', accent: true },
    { d: 'M70 120L54 176M170 120L186 176' },
    { d: 'M90 120L84 176M150 120L156 176', thin: true },
    { d: 'M72 152H168', thin: true },
    { d: 'M46 176H62M178 176H194M78 176H90M150 176H162' },
    { d: 'M72 106V44a8 8 0 0 1 8-8H160a8 8 0 0 1 8 8V106' },
    { d: 'M72 54H168M72 74H168', thin: true },
    { d: 'M72 84H44V106M168 84H196V106' },
    ground(),
  ],
  commode: [
    { d: 'M64 96C64 84 176 84 176 96C176 112 64 112 64 96z' },
    { d: 'M86 97C86 92 154 92 154 97C154 104 86 104 86 97z', thin: true },
    { d: 'M72 104C78 138 162 138 168 104', thin: true },
    { d: 'M86 128H154', accent: true },
    { d: 'M64 96L52 176M176 96L188 176' },
    { d: 'M64 62H40V90M176 62H200V90' },
    { d: 'M72 62V92M168 62V92', thin: true },
    { d: 'M72 34a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6v28H72z' },
    { d: 'M58 150H182', thin: true },
    { d: 'M44 176H60M180 176H196' },
    ground(),
  ],
  'bp-monitor': [
    { d: 'M96 48a12 12 0 0 1 12-12h88a12 12 0 0 1 12 12v94a12 12 0 0 1-12 12H108a12 12 0 0 1-12-12z' },
    { d: 'M110 50H194V104H110z', thin: true },
    { d: 'M116 78H132L137 62L145 94L152 72L156 78H188', accent: true },
    { d: ring(130, 128, 10) },
    { d: ring(174, 128, 10) },
    { d: 'M96 128C70 128 66 96 54 96' },
    { d: 'M18 86a4 4 0 0 1 4-4h34a4 4 0 0 1 4 4v64a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z' },
    { d: 'M18 104H60M18 132H60', thin: true },
    ground(168),
  ],
  supplies: [
    { d: 'M40 76L120 48L200 76V160L120 186L40 160z' },
    { d: 'M40 76L120 104L200 76M120 104V186' },
    { d: 'M80 62L160 90V112', thin: true },
    { d: 'M67 118h9v-9h9v9h9v9h-9v9h-9v-9h-9z', accent: true },
    { d: 'M136 124L184 108M136 140L184 124M136 156L166 146', thin: true },
    { d: 'M100 40C96 20 118 14 122 34V50', thin: true },
    { d: 'M140 52C138 28 158 26 158 44V66', thin: true },
  ],
}

export default function EquipmentArt({ id, className = '', eager = false }) {
  const reduce = useReducedMotion()
  const strokes = art[id]
  if (!strokes) return null

  const trigger =
    reduce || eager ? { animate: 'shown' } : { whileInView: 'shown', viewport: { once: true, amount: 0.25 } }

  return (
    <motion.svg
      viewBox="0 0 240 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      initial={reduce ? 'shown' : 'hidden'}
      {...trigger}
    >
      {strokes.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          custom={i}
          variants={draw}
          stroke={s.accent ? 'var(--color-ember)' : 'currentColor'}
          strokeWidth={s.thin ? 1.1 : 2}
        />
      ))}
    </motion.svg>
  )
}
