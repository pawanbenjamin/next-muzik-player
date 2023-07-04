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
        layout: "30% 70%"
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
          primary: "#00485b",

          secondary: "#186dbc",

          accent: "#e253d4",

          neutral: "#2b242e",

          "base-100": "#302d48",

          info: "#5ca8cc",

          success: "#5ae7bd",

          warning: "#b36c0f",

          error: "#f06656"
        }
      }
    ]
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")]
};
