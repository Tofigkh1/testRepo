/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.pexels.com','tiens.com.tr', 'img.freepik.com', 'obsjtmm.jtmm.com','encrypted-tbn0.gstatic.com',"w0.peakpx.com","www.tianshi.az","www.tiens-so.com","strgimgr.umico.az"],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
