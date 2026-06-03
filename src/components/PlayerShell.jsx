'use client'
import dynamic from 'next/dynamic'

const PlayerExplorerPageDynamic = dynamic(
  () => import('./PlayerExplorerPage'),
  { ssr: false },
)

export default function PlayerShell(props) {
  return <PlayerExplorerPageDynamic {...props} />
}
