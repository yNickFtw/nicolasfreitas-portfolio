import { api } from '@/app/shared/helpers/api';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const nextAuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials, req) {
                try {
                    const response = await api.post('/api/user/login', { email: credentials?.email, password: credentials?.password })

                    if (response.status === 200 && response.data.user) {
                        return response.data.user;
                    }

                    return null;
                } catch (error: any) {
                    throw error.response.data;
                }
            },
        })
    ],

    pages: {
        signIn: "/user/login",
        error: '/user/login',
        verifyRequest: '/user/login'
    },

    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)

            return token
        },

        async session({ session, token }) {
            session = token.user as any;

            return session;
        }
    }
}