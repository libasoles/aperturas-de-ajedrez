import type { Metadata } from 'next'
import PlayerShell from '@/components/PlayerShell'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { player: string }
}): Promise<Metadata> {
  const name = decodeURIComponent(params.player)
  return {
    title: `${name} | Explorador de Jugador | Aperturas de Ajedrez`,
    robots: 'noindex,nofollow',
  }
}

export default function PlayerPage({
  params,
}: {
  params: { player: string }
}) {
  return (
    <div className="h-screen" style={{ background: '#0f1117' }}>
      <PlayerShell
        player={decodeURIComponent(params.player)}
        locale="es"
      />
    </div>
  )
}
