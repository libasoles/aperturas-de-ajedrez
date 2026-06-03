import type { Metadata } from 'next'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {}

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootLayout lang="fr">{children}</RootLayout>
}
