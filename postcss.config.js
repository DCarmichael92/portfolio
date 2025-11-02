// Tailwind CSS v4 + Next 16 (Turbopack) — tell Tailwind where to scan for classes
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Globs for your app code (adjust if you move files)
      sources: [
        './src/**/*.{js,jsx,ts,tsx,mdx}',
        './app/**/*.{js,jsx,ts,tsx,mdx}',
        './pages/**/*.{js,jsx,ts,tsx,mdx}',
        './components/**/*.{js,jsx,ts,tsx,mdx}',
        './public/**/*.html'
      ],
    },
    autoprefixer: {},
  },
};
