/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "10% 75% 15%"
      },
      gridTemplateColumns: {
        layout: "25% 75%"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#000000",

          secondary: "#151515",

          accent: "#115e59",

          neutral: "#f5f5f4",

          "base-100": "#2c2b2b",

          info: "#fbc86f",

          success: "#34d399",

          warning: "#f9e72c",

          error: "#f87171"
        }
      }
    ]
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")]
};
