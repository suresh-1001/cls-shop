import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD ?? 'clsadmin2025'
const COOKIE = 'cls_auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow login page and auth API through
  if (pathname === '/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  // Check auth cookie
  const auth = req.cookies.get(COOKIE)?.value
  if (auth === PASSWORD) return NextResponse.next()

  // Redirect to login
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('from', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
