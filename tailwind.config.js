/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PAULILY International B2B — Quiet Luxury Palette
        'p-black': '#0A0A0A',
        'p-off-black': '#1A1A1A',
        'p-dark-gray': '#3A3A3A',
        'p-mid-gray': '#6B6B6B',
        'p-silver': '#9A9A9A',
        'p-light-gray': '#D4D4D4',
        'p-off-white': '#F5F5F0',
        'p-warm-white': '#FAF8F5',
        'p-pure-white': '#FFFFFF',
        'p-gold': '#C9A84C',
        'p-gold-light': '#D4BA6A',
        'p-cream': '#EDE8E0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'Helvetica Neue', 'sans-serif'],
        accent: ['Cormorant Garamond', 'Playfair Display', 'serif'],
      },
      letterSpacing: {
        'brand': '0.35em',
        'nav': '0.12em',
        'label': '0.18em',
        'wide': '0.25em',
      },
    },
  },
  plugins: [],
};