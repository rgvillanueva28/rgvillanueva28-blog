module.exports = {
  important: true,
  content: [
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1560px",
    },
    extend: {
      colors: {
        dark: "#05386B",
        accent: {
          light: "#8EE4AF",
          dark: "#379683",
          mid: "#5CDB95",
        },
        foreground: "#EDF5E1",
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
