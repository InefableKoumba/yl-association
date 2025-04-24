/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#043D9C',
        secondary: '3963EA',
        background: '#0357FC',
        textBlack: '#1A1A1A',
        textGray: '#333',
      },
      animation: {
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        'subtle-zoom': {
          '0%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
