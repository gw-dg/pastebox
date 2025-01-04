/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript/TypeScript files in the src folder
    "./index.html", // Include the index.html file in the public folder
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: {
          light: "#f0f6fc",
          dark: "#212225",
        },
        secondaryBg: {
          light: "#e8eef4",
          dark: "#161B22",
        },
        tertiaryBg: {
          light: "#f3f8fa",
          dark: "#21262D",
        },
        fourthBg: {
          light: "#eaecef",
          dark: "#303136",
        },
        navbarBg: {
          light: "#0a0a0b",
          dark: "#0a0a0b",
        },
        tooltipSubmenuBg: {
          light: "#e1e4e8",
          dark: "#2D333B",
        },
        textPrimary: {
          light: "#333333",
          dark: "#C9D1D9",
          neutral: "#B0A0A0",
        },
        textSecondary: {
          light: "#586069",
          dark: "#8B949E",
        },
        textTertiary: {
          light: "#6e7781",
          dark: "#6E7681",
        },
        textHeading: {
          light: "#24292f",
          dark: "#C9D1D9",
        },
        textDisabled: {
          light: "#7b8085",
          dark: "#484F58",
        },
        borderColor: {
          light: "#dbdde0",
          dark: "#30363D",
        },
        dividerColor: {
          light: "#eaecef",
          dark: "#21262D",
        },
        buttonBg: {
          light: "#0a0a0b",
          dark: "#0a0a0b",
        },
        buttonText: {
          light: "#24292f",
          dark: "#C9D1D9",
        },
        buttonHoverBg: {
          light: "#b0b8c1",
          dark: "#30363D",
        },
        buttonActiveBg: {
          light: "#dcdee0",
          dark: "#161B22",
        },
        focusBorderColor: {
          light: "#f0f6fc1a",
          dark: "#f0f6fc1a",
        },
        hoverBorderColor: {
          light: "#6e737a",
          dark: "#858585",
        },
        infoAlertBg: {
          light: "#ddf4ff",
          dark: "#1F6FEB",
        },
        successAlertBg: {
          light: "#dcffe4",
          dark: "#238636",
        },
        warningAlertBg: {
          light: "#fff5b1",
          dark: "#D29922",
        },
        errorAlertBg: {
          light: "#ffe3e6",
          dark: "#DA3633",
        },
        linkColor: {
          light: "#0366d6",
          dark: "#58A6FF",
        },
        linkHoverColor: {
          light: "#8444f3",
          dark: "#A371F7",
        },
        codeBlockBg: {
          light: "#f6f8fa",
          dark: "#161B22",
        },
        inlineCodeBg: {
          light: "#f6f8fa",
          dark: "#161B22",
        },
        shadow: {
          light: "rgba(0, 0, 0, 0.1)",
          dark: "rgba(1, 4, 9, 0.5)",
          "subtle-glow": "rgba(0, 200, 255, 0.15)",
          "neon-aqua": "rgba(50, 200, 255, 0.4)",
          "deep-ocean": "rgba(0, 180, 120, 0.2)",
          "mystic-blue": "rgba(30, 144, 255, 0.3)",
          iridescent: "rgba(0, 200, 180, 0.4)",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Add your custom font here
      },
    },
  },

  plugins: [],
});
