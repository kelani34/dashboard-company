//Determine which env file to use, based on the environment
const root = require('./paths').root;
const envPaths = {
  development: `${root}/.env.development`,
  staging: `${root}/.env.staging`,
  production: `${root}/.env`,
};
module.exports = envPaths[process.env.NODE_ENV] || envPaths['production'];
