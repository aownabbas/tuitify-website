/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: {
    domains: [
      'test.giisty.com', 
      "d12wv9lymg6ml4.cloudfront.net",
      "inspire.giisty.com",
      "d3j1b9ujwz1ebx.cloudfront.net",
      "d2bw7r5dl8dn6n.cloudfront.net",
      "www.goodfreephotos.com",
      "giistyxelor.s3.amazonaws.com",
    ],
  },
}

module.exports = nextConfig
