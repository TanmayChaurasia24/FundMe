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
      async authorize(credentials) {
        await dbconnect();

        const name = credentials?.name;
        const email = credentials?.email;
        const password = credentials?.password;

        if (!name || !email || !password) {
          throw new Error("All fields are required.");
        }

        let user = await User.findOne({ email });

        if (user) {
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) throw new Error("Invalid email or password.");

          return { id: user._id, username: user.username, email: user.email };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          username: name,
          email,
          password: hashedPassword,
        });

        return { id: newUser._id, username: newUser.username, email: newUser.email };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github" || account?.provider === "google") {
        await dbconnect();
        const userEmail = user.email;
        let currentUser = await User.findOne({ email: userEmail });

        if (!currentUser) {
          currentUser = await User.create({
            username: userEmail?.split("@")[0],
            email: userEmail,
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  return NextAuth(req, res, authOptions);
}
