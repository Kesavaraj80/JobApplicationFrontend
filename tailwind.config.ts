/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1655a5",
        secondary: "#f4f3f1",
        btn_primary: "#043865",
        btn_secondary: "#f8674b",
      },
    },
  },
  plugins: [],
};
