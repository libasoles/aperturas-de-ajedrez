import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl

  // Redirect chessopenings.com.ar root to English
  if (hostname === 'chessopenings.com.ar' && pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files, images, etc.
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
