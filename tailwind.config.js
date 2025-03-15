/** @type {import('tailwindcss').Config} */
import { scrollbar } from 'tailwindcss-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '0.9rem' }]
      }
    },
  },
  plugins: [
    scrollbar,
  ],
}