/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // eslint-disable-next-line no-undef
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jkxbtielhupeojitxgjt.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
