const GOLD = '#C9A24A'
const INK = '#1C1A18'

export function BrandIcon({ size }: { size: number }) {
  const crownSize = Math.round(size * 0.72)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: INK,
        borderRadius: Math.round(size * 0.22),
      }}
    >
      <svg
        width={crownSize}
        height={crownSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={GOLD}
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
        <path d="M5 21h14" />
      </svg>
    </div>
  )
}
