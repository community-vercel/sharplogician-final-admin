// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

module.exports = {
  basePath: '/admin',

  
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  images: {
    domains: ["100.64.6.105"],
  },
};
