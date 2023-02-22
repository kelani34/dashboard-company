const postCssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postCssPresetEnv({
      browsers: 'last 1 versions',
    }),
    autoprefixer,
  ],
};

// module.exports = {
//   plugins: [
//     require('postcss-preset-env')({
//       browsers: 'last 1 versions',
//     }),
//     require('autoprefixer'),
//   ],
// };
