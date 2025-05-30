/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",  // <-- add this for new app dir
      "./pages/**/*.{js,ts,jsx,tsx}",  // if you use pages dir
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  