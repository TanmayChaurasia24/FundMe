import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { dbconnect } from "@/db/db"; // Assuming this is your DB connection utility

interface UserCredentialType {
  name: string;
  email: string;
  password: string;
}

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
      if (account?.provider === "github") {
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
};

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("Error in GET handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("Error in POST handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
