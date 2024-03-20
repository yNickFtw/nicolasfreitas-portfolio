'use client'

import { ReactNode } from "react";
import { SessionProvider } from 'next-auth/react'

interface NextAuthSessionProvider {
    children: ReactNode
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProvider) {
    return <SessionProvider>{children}</SessionProvider>
}