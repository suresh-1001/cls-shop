import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD ?? 'clsadmin2025'
const COOKIE = 'cls_auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow the login page and its POST through
  if (pathname === '/login') return NextResponse.next()

  // Check auth cookie
  const auth = req.cookies.get(COOKIE)?.value
  if (auth === PASSWORD) return NextResponse.next()

  // Redirect to login, preserving intended destination
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('from', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
