/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript/TypeScript files in the src folder
    "./index.html", // Include the index.html file in the public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
