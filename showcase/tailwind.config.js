/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: {
            50: '#F0F7FF',
            100: '#E0EFFF',
            200: '#BAE0FD',
            300: '#7CC5FB',
            400: '#38A3F8',
            500: '#0E87EA',
            600: '#026BC7',
            700: '#0355A1',
          },
          orange: {
            50: '#FFF8F1',
            100: '#FEECDC',
            200: '#FCD9BD',
            300: '#FDBA8C',
            400: '#FA8C42',
            500: '#F16514',
            600: '#D44A08',
            700: '#A63408',
          }
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

