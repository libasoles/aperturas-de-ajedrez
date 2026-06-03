import type { Metadata } from 'next'
import PlayerShell from '@/components/PlayerShell'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ player: string }>
}): Promise<Metadata> {
  const { player } = await params
  const name = decodeURIComponent(player)
  return {
    title: `${name} | Explorador de Jugador | Aperturas de Ajedrez`,
    robots: 'noindex,nofollow',
  }
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ player: string }>
}) {
  const { player } = await params
  return (
    <div className="h-screen" style={{ background: '#0f1117' }}>
      <PlayerShell
        player={decodeURIComponent(player)}
        locale="es"
      />
    </div>
  )
}
