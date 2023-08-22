/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/v0/b/happyfit-app.appspot.com/o/**',
         },
      ],
   },
}

module.exports = nextConfig
