/** @type {import('next').NextConfig} */
module.exports = {
  // Set `reactStrictMode` to `true` to enable React's strict mode.
  // In strict mode, React will log additional warnings to help catch potential issues.
  reactStrictMode: true,

  // Define an asynchronous function `redirects` that returns an array of objects representing the redirect rules for the app.
  async redirects() {
    // Return an array with two redirect rules:
    return [
      {
        // This rule matches any request to the `/github` path and redirects it to the specified destination URL.
        source: "/github",
        destination: "https://github.com/llegomark/betterreadings",
        // Set `permanent` to `false` to indicate that this is a temporary redirect.
        permanent: false,
      },
      {
        // This rule matches any request to the `/twitter` path and redirects it to the specified destination URL.
        source: "/twitter",
        destination: "https://twitter.com/markllego",
        // Set `permanent` to `false` to indicate that this is a temporary redirect.
        permanent: false,
      },
    ];
  },
};
