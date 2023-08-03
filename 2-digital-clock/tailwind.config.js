/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        on: 'rgb(6 182 212)',
        'on-dark': 'rgb(8 145 178)',
        'on-light': 'rgb(236 254 255)',
        off: 'rgb(30 41 59);',
      },
    },
  },
  plugins: [],
};
