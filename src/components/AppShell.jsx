'use client'
import dynamic from 'next/dynamic'

const AppClientDynamic = dynamic(() => import('./AppClient'), { ssr: false })

export default function AppShell({ pathname, ...rest }) {
  // key={pathname} ensures AppClient remounts on every page navigation so that
  // useState() initializers re-run with the new pathname. Without this, Next.js
  // soft-navigation keeps the same component instance alive across pages and
  // the opening/variant state derived from the URL would never update.
  return <AppClientDynamic key={pathname} pathname={pathname} {...rest} />
}
