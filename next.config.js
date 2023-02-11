/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/llegomark/",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/markllego",
        permanent: false,
      },
    ];
  },
}
