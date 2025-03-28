// import NextAuth, { AuthOptions, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/lib/db";
// import bcrypt from "bcryptjs";
// import { WithId, Document } from "mongodb";

// // Type for your user document
// interface IUser extends WithId<Document> {
//   email: string;
//   password: string;
//   name?: string;
//   emailVerified?: Date | null;
// }

// export const authOptions: AuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<User | null> {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Please enter an email and password");
//         }

//         const client = await clientPromise;
//         const db = client.db();
//         const user = await db.collection<IUser>("users").findOne({ 
//           email: credentials.email 
//         });

//         if (!user || !user.password) {
//           throw new Error("No user found");
//         }

//         const passwordMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!passwordMatch) {
//           throw new Error("Incorrect password");
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user && token?.id) {
//         session.user.email = token.id as string;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };



import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        
        const user = await User.findOne({ email: credentials?.email });
        
        if (!user) return null;
        
        const isValid = await bcrypt.compare(
          credentials?.password || "", 
          user.password
        );
        
        if (!isValid) return null;
        
        return { 
          id: user._id.toString(), 
          email: user.email, 
          name: user.name 
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly typed
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.id as string;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };