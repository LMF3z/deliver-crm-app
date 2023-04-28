/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgDefault: '#f4f2fe',
        bgHighlight: '#fefffe',
        purpure: '#646cff',
        purpureHover: '#535bf2',
        textBoldColor: '#262626',
        bgModal: 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: false,
    themes: false,
    base: false,
    utils: false,
    logs: false,
    rtl: false,
    prefix: '',
    darkTheme: 'light',
  },
};
