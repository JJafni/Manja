const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "yellow-theme": {
          extend: "light", // Extend from the default light theme
          colors: {
            background: "#FFFFE0", // Light yellow background
            foreground: "#333333", // Text color
            primary: {
              50: "#FFFDE7",
              100: "#FFF9C4",
              200: "#FFF59D",
              300: "#FFF176",
              400: "#FFEE58",
              500: "#FFEB3B", // Main yellow color
              600: "#FDD835",
              700: "#FBC02D",
              800: "#F9A825",
              900: "#F57F17",
              DEFAULT: "#FFEB3B",
              foreground: "#333333", // Text color on primary color background
            },
            // Add other color scales as needed
          },
          // Customize other theme aspects like layout as needed
        },
      },
    }),
  ],
};


