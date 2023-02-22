const path = require('path');

module.exports = {
  //Root of the application
  root: path.normalize(path.resolve('./')),

  // Source files
  src: path.normalize(path.resolve(__dirname, '../src')),

  assets: path.normalize(path.resolve(__dirname, '../src/shared/assets')),

  // Production build files
  build: path.normalize(path.resolve(__dirname, '../dist')),

  // Static files that get copied to build folder
  public: path.normalize(path.resolve(__dirname, '../public')),
};
