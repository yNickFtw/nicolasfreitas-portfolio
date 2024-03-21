import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
    '/api/language/create'
]

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('next-auth.session-token')

    const isProtectedRoute = protectedRoutes.some((prefix) => request.nextUrl.pathname.startsWith(prefix))

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/user/login', request.url));
    }
}

export const config = {
    matcher: [
        '/api/language/create'
    ]
}
