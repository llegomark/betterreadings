/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/llegomark/betterreading",
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
