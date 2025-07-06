import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const protectedRoutes = ['/dashboard'];
    const authRoutes = ['/login'];

    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some(route => 
        pathname.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        console.log('Middleware: Redirecting to login - no token for protected route');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
