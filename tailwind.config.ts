import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class", 
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coffee Brown palette - Rich espresso-based colors
        coffee: {
          50:  '#faf6f3',
          100: '#f3ebe4',
          200: '#e6d5c8',
          300: '#d4b8a5',
          400: '#c19780',
          500: '#a87b5f',
          600: '#6F4E37', // Base color - Classic Coffee Brown
          700: '#5c4130',
          800: '#4d3628',
          900: '#412e24',
          950: '#231812',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;