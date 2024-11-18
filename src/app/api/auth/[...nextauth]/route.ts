// pages/api/auth/[...nextauth].ts

import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { dbconnect } from "@/db/db";

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbconnect();
        const name = credentials?.name as string | undefined;
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!name || !email || !password) {
          throw new Error("Enter every information");
        }

        const user = await User.findOne({ email: email });

        if (user) {
          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            throw new Error("Invalid email or password");
          }

          return user;
        } else {
          // Create a new user if they don't exist
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await User.create({
            username: name,
            email: email,
            password: hashedPassword,
          });

          return newUser;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account?.provider === "github" || account?.provider === "google") {
        await dbconnect();
        const userEmail = user.email;
        const currentUser = await User.findOne({ email: userEmail });

        // Create a new user if it doesn't exist
        if (!currentUser) {
          const newUser = new User({
            username: userEmail.split("@")[0],
            email: userEmail,
          });
          await newUser.save();
        } else {
          user.name = currentUser.username;
        }
      }
      return true;
    },
    async session({ session }: { session: Session }) {
      await dbconnect();
      const dbUser = await User.findOne({ email: session.user?.email });

      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',  
  },
};

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, authOptions);
}
