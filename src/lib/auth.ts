import bcrypt from "bcryptjs";


export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}




// lib/auth.ts
import { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminAuth } from "@/lib/firebaseAdmin"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
      
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;
      
          const token = await user.getIdToken();
          const decodedToken = await adminAuth.verifyIdToken(token);
      
          await dbConnect();
      
          let existingUser = await User.findOne({ email: decodedToken.email });
      
          if (!existingUser) {
            existingUser = await User.create({
              email: decodedToken.email,
              name: user.displayName || "",
              firebaseUID: decodedToken.uid,
            });
          }
      
          return {
            id: existingUser._id.toString(),
            email: existingUser.email,
            name: existingUser.name,
          };
        } catch (error) {
          console.error("🔥 Firebase Authentication Error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
      } catch (error) {
        console.error("JWT Callback Error:", error);
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          session.user.email = token.email as string;
          session.user.name = token.name as string;
        }
      } catch (error) {
        console.error("Session Callback Error:", error);
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};