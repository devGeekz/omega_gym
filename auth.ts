import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import { getUserByEmail } from "@/utils/db";
import { verifyPassword } from "@/lib/secrets/bcryptHash";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // ============================================================
    //  GOOGLE OAUTH PROVIDER
    // ============================================================
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ============================================================
    //  CREDENTIALS PROVIDER (password login)
    // ============================================================
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          throw new Error("User does not exist.");
        }

        // logic to salt and hash password
        const passwordValid = await verifyPassword(password, user.password!);
        if (!passwordValid) {
          throw new Error("Wrong password.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 days
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // ------------------------------------------------------------
    // JWT CALLBACK
    // ------------------------------------------------------------
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image ?? "";
      }
      return token;
    },

    // ------------------------------------------------------------
    // SESSION CALLBACK
    // ------------------------------------------------------------
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
});
