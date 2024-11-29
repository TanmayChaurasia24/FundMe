/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.aceternity.com'], // Existing domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Existing remote pattern
      },
    ],
  },
};

export default nextConfig;
