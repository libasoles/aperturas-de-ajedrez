import type { Metadata } from 'next'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootLayout lang="en">{children}</RootLayout>
}
