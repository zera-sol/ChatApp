import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define static assets and API route exclusions
const PUBLIC_FILE = /\.(.*)$/;
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  // Retrieve the session token from the cookies
  const token = await getToken({ req, secret});

  // Exclude static files and API routes from the middleware check
  if (
    pathname.startsWith('/_next') || // Ignore Next.js internal files
    pathname.startsWith('/static') || // Ignore static assets folder
    pathname.startsWith('/api') || // Ignore API routes
    PUBLIC_FILE.test(pathname) // Ignore static files like CSS, images, etc.
  ) {
    return NextResponse.next();
  }

  // Allow access to the login and register pages without authentication
  if (token && (pathname === "/login" || pathname === "/register")) {
    console.log({"token ->": token})
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if logged in
  }

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // For admin routes, check for admin access
  if (pathname.startsWith('/admin') && !token.isAdmin) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Proceed to the requested page if the user is authenticated
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/admin/:path*', '/contact/:path*', '/blog/:path*'],
};

