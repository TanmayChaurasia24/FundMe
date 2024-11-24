
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/userModel";
import { dbconnect } from "../../../../db/db";


const authOptions: any = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }): Promise<any> {
      console.log("inside signin callback");
      
      if (account?.provider === "github" || account?.provider === "google") {
        await dbconnect();
        console.log("db connected");
        
        const userEmail = user.email;
        const currentUser = await User.findOne({ email: userEmail });
        console.log(currentUser);
        
        if (!currentUser) {
          const newuser = await User.create({
            username: userEmail?.split("@")[0],
            email: userEmail,
          });

          console.log(newuser);
          
        }
      }
      console.log("exiting signin callback");
      
      return true;
    },

    async session({ session }) {
      console.log("inside session callback");
      
      if (session?.user?.email) {
        await dbconnect();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }
      }
      console.log("exiting session callback");
      
      return session || {};
    },
  },
})

export {authOptions as GET, authOptions as POST}

