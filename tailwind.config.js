module.exports = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#59C1CC",
        secondary: "#EB6A7C",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
