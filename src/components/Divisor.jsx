// Divisor orgánico: una línea que evoca un tallo con hojas secas,
// usado entre secciones como firma visual del sitio.
export default function Divisor({ fondo = '#faf9f4' }) {
  return (
    <svg
      className="divisor"
      viewBox="0 0 1200 46"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect width="1200" height="46" fill={fondo} />
      <path
        d="M0 23 C 150 5, 300 41, 450 23 S 750 5, 900 23 S 1100 38, 1200 23"
        fill="none"
        stroke="#e95f9e"
        strokeWidth="2"
        opacity="0.55"
      />
      <g fill="#e95f9e" opacity="0.5">
        <ellipse cx="150" cy="14" rx="7" ry="3" transform="rotate(-25 150 14)" />
        <ellipse cx="450" cy="12" rx="7" ry="3" transform="rotate(20 450 12)" />
        <ellipse cx="750" cy="14" rx="7" ry="3" transform="rotate(-25 750 14)" />
        <ellipse cx="1050" cy="12" rx="7" ry="3" transform="rotate(20 1050 12)" />
      </g>
    </svg>
  )
}
