
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#9A7AFF',
          DEFAULT: '#8A5CF6',
          dark: '#6E43D2',
        },
        secondary: {
          light: '#F0ECFF',
          DEFAULT: '#E5DEFF',
          dark: '#D1C6FF',
        },
        background: '#8A5CF6',
      },
      boxShadow: {
        'neomorphic': '20px 20px 60px #7650d2, -20px -20px 60px #9e68ff',
        'inner-neomorphic': 'inset 5px 5px 10px #7650d2, inset -5px -5px 10px #9e68ff',
        '3d': '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'purple-gradient': 'linear-gradient(135deg, #8A5CF6, #9A7AFF)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
