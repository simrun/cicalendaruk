/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/london",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
