/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './lib/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    'node_modules/flowbite-react/dist/esm/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('flowbite/plugin')]
}
