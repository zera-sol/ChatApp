import { User } from "@/lib/models";
import { connectoDb } from "@/lib/utils";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";

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
    // Email/Password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        // Look for user in the database using email
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error("No user found with this email");
        }

        // Compare password using bcrypt
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // If email and password are valid, return the user
        return user;
      }
    })
  ],
  callbacks: {
    async signIn({user, account, profile}) {
      console.log({user, account, profile});
      //if the user logged in with github
      if(account.provider === "github"){
        try {
          //connect to db
         await connectoDb()

          //check if user exists in db
          const userExists = await User.findOne({email: user.email});

          //if user does not exist, create user
          if(!userExists){
            await User.create({
              username: user.name,
              email: user.email,
              img: user.image,
            });
          }

         
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      //if user logs in with google
      else if(account.provider === "google"){
        try {
          //connect to db
         await connectoDb()

          //check if user exists in db
          const userExists = await User.findOne({email: user.email});

          //if user does not exist, create user
          if(!userExists){
            await User.create({
              username: user.name,
              email: user.email,
              img: user.image,
            });
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
       
      return true;
    },
    // JWT callback to always fetch user data from the database
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id; // Set user id in token
      }

      // Fetch user data from the database using token's email
      await connectoDb();
      const dbUser = await User.findOne({ email: token.email });

      if (dbUser) {
        token.id = dbUser._id;
        token.username = dbUser.username;
        token.image = dbUser.img;
        token.email = dbUser.email;
      }

      return token; // Return the token with updated user data
    },
    async session({ session, token }) {
      session.user.id = token.id;  // Set user id in session
      session.user.username = token.username; // Set username in session
      session.user.image = token.image; // Set profile image in session
      session.user.email = token.email; // Set email in session

      return session;  // Return the session with user data
    },
  },
  // Optional: Customize your sign-in page
  pages: {
    signIn: '/auth/login',  // Replace with your custom login page route
  },
});


export { handler as GET, handler as POST };


// // app/api/auth/[...nextauth].js
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";

// export default NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: '/login', // Customize the sign-in page path
//   },
//   debug: true,
// });
