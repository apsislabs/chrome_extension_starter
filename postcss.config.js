const PROD = process.env.NODE_ENV == "production";
module.exports = {
  plugins: {
    "rucksack-css": {},
    autoprefixer: {},
    cssnano: PROD ? {} : false
  }
};
