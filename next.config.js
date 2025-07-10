/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // GitHub Pages deployment configuration
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // Set base path for GitHub Pages if deploying to a subdirectory
  // basePath: '/MyResume', // Uncomment if repo name is MyResume
}

module.exports = nextConfig
