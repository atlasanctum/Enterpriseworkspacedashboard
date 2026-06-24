import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // For now, allow all routes to work without authentication
  // In production, uncomment the withAuth implementation below
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

/* 
// Production implementation with NextAuth
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Role-based access control
    if (pathname.startsWith('/audit-trails') && token?.role !== 'admin' && token?.role !== 'auditor') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname.startsWith('/workflows') && token?.role !== 'admin' && token?.role !== 'data-officer') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};
*/
