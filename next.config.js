/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_CLIENT: "http://localhost:3000",
    REACT_APP_SERVER: "http://localhost:5000",
    },};