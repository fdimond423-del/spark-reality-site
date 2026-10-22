/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F30',
          dark: '#071521',
          light: '#132B42',
          surface: '#0E263B',
        },
        olive: {
          DEFAULT: '#52683B',
          dark: '#3E502C',
          light: '#657F49',
          tint: 'rgba(82, 104, 59, 0.12)',
        },
        spark: {
          white: '#FFFFFF',
          lightGrey: '#F5F7F6',
          darkText: '#202A33',
          mutedText: '#68747D',
          border: 'rgba(11, 31, 48, 0.12)',
          borderDark: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        tightest: '-.04em',
      }
    },
  },
  plugins: [],
}
