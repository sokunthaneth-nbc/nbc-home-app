/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class', // ✅ Enable class-based dark mode
	content: [
	  "./app/**/*.{js,ts,jsx,tsx}",
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	  "./node_modules/flowbite-react/**/*.js", // ✅ Add this if you use Flowbite React
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-kantumruy)', 'sans-serif'],
			},
		},
	},
	plugins: [],
  };  