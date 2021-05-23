module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		fontFamily: {
			// prettier-ignore
			'roboto': ["Roboto Condensed", "sans-serif"],
			// prettier-ignore
			'lato': ['Lato', 'sans-serif'],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
