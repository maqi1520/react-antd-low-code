module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
  eslint: {
    dirs: ['src', 'server'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};
