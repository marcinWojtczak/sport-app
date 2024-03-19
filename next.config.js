/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['uploadthing.com', 'lh3.googleusercontent.com', "avatars.githubusercontent.com", 's3.eu-central-1.amazonaws.com'],
      },
}

module.exports = nextConfig
