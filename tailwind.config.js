/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg:      '#080810',
        surface:     '#0e0e1a',
        surfaceHover:'#14142a',
        primary:     '#a8ff00',
        primaryHover:'#c8ff40',
        textMain:    '#e8e8f0',
        textMuted:   '#9090a8',
        borderDim:   'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      animation: {
        'fadeUp':  'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
