import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/models"; // Your user model (if using Mongoose)
import { connectoDb } from "@/lib/utils";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try{

      
      // Connect to your database
      await connectoDb();

      // Check if the user exists in the database
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // If user does not exist, create a new record
        const newUser = new User({
          username: user.name,
          email: user.email,
          img: user.image,
        });
        
       const data =  await newUser.save(); // Save the new user to the database
       console.log(data)
      }
    }catch(err){
      console.log(err)
      throw new Error(err)
    }

      return true; // Allow the sign-in to proceed
    },
    async session({ session, token }) {
      // You can include additional user data in the session
      session.user._id = token.sub; // or however you're storing user IDs
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user._id; // Save the user ID to the token
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',  // Replace with your custom login page route
  },
});

export { handler as GET, handler as POST };
