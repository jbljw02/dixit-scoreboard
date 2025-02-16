import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        vibrate: {
          '0%': {
            transform: 'translateX(0)',
          },

          '25%': {
            transform: 'translateX(-1.5px)',
          },

          '50%': {
            transform: 'translateX(1.5px)',
          },

          '75%': {
            transform: 'translateX(-1.5px)',
          },

          '100%': {
            transform: 'translateX(1.5px)',
          },
        },
      },
      animation: {
        vibrate: 'vibrate 0.2s ease-in-out 0s 2'
      }
    }
  },
  plugins: [],
}

export default config