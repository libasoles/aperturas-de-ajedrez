import type { Metadata } from 'next'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {}

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <RootLayout lang="es">{children}</RootLayout>
}
