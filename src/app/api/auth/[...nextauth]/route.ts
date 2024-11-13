import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "github") {
        if (!mongoose.connection.readyState) {
          await mongoose.connect(process.env.MONGO_URL!);
        }
        const userEmail = user.email;

        const currentUser = await User.findOne({ email: userEmail });

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
    async session({ session }: any) {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGO_URL!);
      }
      const dbUser = await User.findOne({ email: session.user?.email });

      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
};

export const GET = async (req: any, res: any) => {
  return await NextAuth(req, res, authOptions);
};

export const POST = async (req: any, res: any) => {
  return await NextAuth(req, res, authOptions);
};
