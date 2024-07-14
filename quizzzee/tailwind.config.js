/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#90ACF4",
        mainColorBold: "#6B83D8",
        mainColorLight: "#C7D4EB",
        subColor: "#A8DC94",
        subColorBold: "#85C167",
        subColorLight: "#C4E6AC",
        extraColor: "#EFD59F",
        extraColorBold: "#D7B577",
        roseWater: "#efb1a4",
        roseWaterBold: "#c26b4d",
      },
    },
  },
  plugins: [],
};
