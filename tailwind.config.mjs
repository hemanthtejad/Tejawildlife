/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'elegant-black': '#1A1A1A',
        'elegant-gold': '#D4AF37',
        'elegant-cream': '#FFFDD0',
        'elegant-gold-light': '#E5C76B',
        'elegant-dark': '#121212',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}