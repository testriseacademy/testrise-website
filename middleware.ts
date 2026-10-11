import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'test-rise-lms-super-secret-jwt-key-2026'
);

const COOKIE_NAME = 'lms_session';

interface DecodedSession {
  email: string;
  fullName: string;
  role: 'student' | 'mentor' | 'admin';
  courseAssigned: string;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  const isLmsRoute = path.startsWith('/lms');
  const isLoginRoute = path === '/lms/login';
  const isMentorRoute = path.startsWith('/lms/mentor');
  const isDashboardRoute =
    path === '/lms/dashboard' ||
    path.startsWith('/lms/course') ||
    path.startsWith('/lms/lesson') ||
    path.startsWith('/lms/settings');

  if (isLmsRoute) {
    if (!token) {
      if (isDashboardRoute || isMentorRoute) {
        const loginUrl = new URL('/lms/login', request.url);
        loginUrl.searchParams.set('redirect', path);
        return NextResponse.redirect(loginUrl);
      }
    } else {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const session = payload as unknown as DecodedSession;

        if (isLoginRoute) {
          if (session.role === 'mentor' || session.role === 'admin') {
            return NextResponse.redirect(new URL('/lms/mentor', request.url));
          }
          return NextResponse.redirect(new URL('/lms/dashboard', request.url));
        }

        if (isMentorRoute) {
          if (session.role !== 'mentor' && session.role !== 'admin') {
            return NextResponse.redirect(new URL('/lms/dashboard', request.url));
          }
        }
      } catch {
        const response = NextResponse.redirect(new URL('/lms/login', request.url));
        response.cookies.delete(COOKIE_NAME);
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/lms/:path*'],
};
