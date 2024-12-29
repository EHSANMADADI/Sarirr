
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        nastaliq: ['nastaliq'],
        Byekan:['Byekan']
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

