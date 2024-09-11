import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from '@/models/User';
import connectDB from '@/db/connectDb';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user user:email",
      async profile(profile, tokens) {
        // If email is not provided, fetch it from GitHub API
        if (!profile.email) {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Authorization: `token ${tokens.access_token}`,
            },
          });
          const emails = await res.json();

          // Get the primary email or the first public email
          const primaryEmail = emails.find((email) => email.primary)?.email || emails[0]?.email;
          profile.email = primaryEmail;
        }
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      }
      
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        // Use email from profile if it exists
        email = email || profile.email;

        // Connect to the database
        await connectDB()
        

        // Check if the user already exists in the database
        const currentUser = await User.findOne({ email });

        if (!currentUser) {
          // Create a new user
          const newUser = new User({
            email: email,
            username: email.split("@")[0],
          });
          await newUser.save();
          user.name = newUser.username;
        } 
        return true;
      }
    },
    async session({session, user, token}){
      const dbUser = await User.findOne({email: session.user.email})
      session.user.name = dbUser.username
      return session
    },
  }
});

export { authoptions as GET, authoptions as POST };
