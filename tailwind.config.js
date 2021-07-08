module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        inndigo: {
          DEFAULT: "#1e6feb",
        },
        primary: {
          DEFAULT: "#070b10",
        },
        secondary: {
          DEFAULT: "#1a1e2c",
        },
        offwhite: {
          DEFAULT: "#fafafa",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
