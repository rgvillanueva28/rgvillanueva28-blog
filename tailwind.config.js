module.exports = {
  important: false,
  purge: [
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
        dark: "#0B2545",
        accent: {
          light: "#8DA9C4",
          dark: "#13315C",
          mid: "#134074",
        },
        foreground: "#EEF4ED",
      },
    },
  },
  variants: {
    animation: ["responsive", "hover", "focus"],
    scale: ["responsive", "hover", "focus", "active", "group-hover"],
    borderRadius: ["responsive", "hover", "focus"],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
