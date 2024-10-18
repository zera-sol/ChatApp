/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com',
                  'lh3.googleusercontent.com'
        ], 
      },
    reactStrictMode: true,
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      GITHUB_CLIENT_ID: process.env.GITHUB_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_SECRET,
    },
  };
  

module.exports = nextConfig

