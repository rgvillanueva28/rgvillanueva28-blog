const isDev = process.env.NODE_ENV === "development";
const withPWA = require("next-pwa");

module.exports = withPWA({
  images: {
    domains: ["res.cloudinary.com"],
  },
  pwa: {
    disable: isDev,
    register: true,
    dest: "public",
  },
});
