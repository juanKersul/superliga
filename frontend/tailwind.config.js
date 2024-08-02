/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/src/assets/db67a44ac4a646b098ce0af8d312d8ef.jpg')",
      },
    },
  },
  plugins: [],
};
