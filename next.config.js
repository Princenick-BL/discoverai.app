/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['picsum.photos','localhost']
  },
  experimental: { images: { layoutRaw: true } }
  
}

module.exports = nextConfig
