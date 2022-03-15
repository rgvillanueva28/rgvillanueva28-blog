const isDev = process.env.NODE_ENV === "development";
const withPWA = require("next-pwa");

module.exports = withPWA({
  swcMinify: true,
  pwa: {
    disable: isDev,
    register: true,
    dest: "public",
  },
});
