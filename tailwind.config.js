/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- 1. CORE BRANDING ---
        // Your primary purple identity
        dominant: "#690299",
        accent: "#ffffff",

        // --- 2. THE PURPLE UI PALETTE ---
        // Renamed from 'neutral' to 'brand-purple' to stop breaking Tailwind's default gray/neutral
        "brand-purple": {
          50: "#D2B1E1", // Your '2-light'
          100: "#C6C6C6", // Your '3'
          200: "#B499C1", // Your 'gradient-2'
          500: "#936FA5", // Your '2'
          700: "#878686", // Your '1'
        },

        // --- 3. SEMANTIC UI COMPONENTS ---
        // Organized by usage so your code is readable (e.g., bg-match-ball)
        match: {
          body: "#754F44",
          ball: "#754F44",
          target: "#754F44",
          history: "rgba(117, 79, 68, 0.59)", // #754F4496
        },

        btn: {
          primary: "#EC7357",
          gold: "#E1CE7A",
        },

        board: {
          bg: "#613A3A",
          over: "#4eda82",
          score: "#4e9ac2",
        },

        // --- 4. LEGACY/THEME OVERRIDES ---
        // Custom blue and dark themes moved to unique keys
        scBlue: {
          DEFAULT: "#007BFF",
          dark: "#004085",
          light: "#CCE5FF",
        },
        scDark: {
          nav: "#2c2b3c",
          body: "#403f4c",
          btn: "#121420",
        },
      },

      backgroundImage: {
        // Fixed the gradient logic to use your specific hex stops
        "app-gradient":
          "linear-gradient(180deg, #D9D9D9 10%, #B499C1 30%, #C89EDD 90%)",
        "purple-glass":
          "linear-gradient(to bottom right, rgba(217, 217, 217, 0.2), rgba(200, 158, 221, 0.4))",
      },

      borderRadius: {
        arena: "32px",
        card: "40px",
      },
    },
  },
  plugins: [],
};
