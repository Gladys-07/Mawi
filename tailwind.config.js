import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            success: {
              50: "#e6f7ec",
              100: "#ccefd9",
              200: "#99dfb3",
              300: "#66cf8d",
              400: "#33bf67",
              500: "#1db954", // Mawi green
              600: "#17944a",
              700: "#126f37",
              800: "#0c4a25",
              900: "#062512",
              DEFAULT: "#1db954",
              foreground: "#ffffff"
            }
          }
        },
        dark: {
          colors: {
            success: {
              50: "#062512",
              100: "#0c4a25",
              200: "#126f37",
              300: "#17944a",
              400: "#1db954", // Mawi green
              500: "#33bf67",
              600: "#66cf8d",
              700: "#99dfb3",
              800: "#ccefd9",
              900: "#e6f7ec",
              DEFAULT: "#1db954",
              foreground: "#ffffff"
            }
          }
        }
      }
    })
  ]
};
