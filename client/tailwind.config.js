/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        gray: "#141414",
        textHeaddingDark: "#FFFFFFD9",
        textDark: "#FFFFFFD9",
        secondaryTextDark: "#FFFFFFA6",
        defaultBorderDark: "#424242FF",
        separatorDark: "#FDFDFD1F",
        primaryColor: "#ec3237",
        headingColor: "#000000E0",
        textColor: "#000000E0",
        secondaryText: "#000000A6",
        defaultBorder: "#D9D9D9FF",
        separator: "#0505050F",
      },
      boxShadow: {
        "3xl": "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
      },
      screens: {
        sm: "600px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
