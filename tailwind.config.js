/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        pallete: {
          bgHeader: '#F5D1D0',
          textColor: '#D56965',
          bgList: '#D7ECD9'
        }
      },
      fontFamily: {
        diavlo: ['Diavlo', 'diavlo-medium']
      }
    },
  },
  plugins: [],
}

