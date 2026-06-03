import '../index.css'

interface RootLayoutProps {
  lang: string
  children: React.ReactNode
}

export function RootLayout({ lang, children }: RootLayoutProps) {
  return (
    <html lang={lang}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f2f2f2" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f1117" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='white'/><text x='50' y='54' font-size='88' text-anchor='middle' dominant-baseline='central'>♟</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
