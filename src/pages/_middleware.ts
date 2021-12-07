import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  if (
    req.url.pathname === '/editor' ||
    req.url.pathname === '/project' ||
    req.url.pathname === '/component'
  ) {
    const session = await getToken({ req, secret: process.env.SECRET });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect('/api/auth/signin');
    // If user is authenticated, continue.
  }
}
