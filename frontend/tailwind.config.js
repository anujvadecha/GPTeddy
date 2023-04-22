/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          '50': '#FBF6F2',
          '100': '#F7E6D5',
          '200': '#EFD2B2',
          '300': '#E1B08A',
          '400': '#CB845E',
          '500': '#B86F52',
          '600': '#97593C',
          '700': '#634133',
          '800': '#392A16',
          '900': '#231C07',
        },
        orange: {
          '50': '#FFF8F3',
          '100': '#FEEAE1',
          '200': '#FCD3C2',
          '300': '#FBAD92',
          '400': '#F78764',
          '500': '#ED6549',
          '600': '#D14F3D',
          '700': '#913435',
          '800': '#66262A',
          '900': '#3E191F',
        },
      },

    },
  },
  plugins: [],
}

