import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/userModel";
import { log } from "console";

export const Options = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
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
    async session({ session, user, token }: any) {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGO_URL!);
      }
      const dbuser = await User.findOne({ email: session.user?.email });

      console.log(dbuser);
      session.user.name = dbuser.username;
      return session;
    }
    
  },
});

export { Options as GET, Options as POST };
