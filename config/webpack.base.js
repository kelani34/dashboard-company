const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const paths = require('./paths');
const envPath = require('./envPath');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [path.normalize(`${paths.src}/index.tsx`)],

  // Where webpack outputs the assets and bundles
  output: {
    path: path.normalize(paths.build),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Puts variables in .env files into process.env
    new Dotenv({
      path: path.normalize(envPath),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.normalize(`${paths.src}/netlify-redirect`),
          to: path.normalize(paths.build),
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: './node_modules/@pdftron/webviewer/public',
          to: path.normalize(`${paths.build}/public/webviewer`),
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: 'Company',
      inject: 'body',
      appMountId: 'app',
      favicon: paths.src + '/images/favicon.png',
      template: `${paths.src}/index.html`, // template file
      filename: 'index.html', // output file
      // ', //Lets us load the appropriate dev scripts in the html
      axios: 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
      bootstrap: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js',
      bootStrapCss: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css',

      react: 'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js',
      reactDom: 'https://cdn.jsdelivr.net/npm/react-dom@17.0.2/index.min.js', // Lets us load the appropriate dev scripts in the html
      popper: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/cjs/popper.min.js',

      redux: 'https://cdn.jsdelivr.net/npm/redux@4.1.0/lib/redux.min.js',
      reactRedux: 'https://cdn.jsdelivr.net/npm/react-redux@7.2.4/lib/index.min.js',
      reactRouterDom: 'https://cdn.jsdelivr.net/npm/react-router-dom@5.2.0/index.min.js',
    }),
    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
      failOnError: false,
      emitWarning: true,
    }),

    // Prettier configuration
    // new PrettierPlugin(),
  ],
  resolve: {
    alias: {
      RocketAssets: `${paths.src}/shared/assets`,
      Components: path.normalize(`${paths.src}/shared/components`),
      Containers: path.normalize(`${paths.src}/shared/containers`),
      Context: path.normalize(`${paths.src}/shared/context`),
      HOC: path.normalize(`${paths.src}/shared/hoc`),
      Utils: path.normalize(`${paths.src}/shared/utils`),
      Hooks: path.normalize(`${paths.src}/shared/hooks`),
      Themes: path.normalize(`${paths.src}/shared/themes`),
      Routes: path.normalize(`${paths.src}/routes`),
    },
    symlinks: false,
    cacheWithContext: false,
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.mjs', '.css', '.scss', '.sass'],
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.(js|jsx|tsx|ts|mjs)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(?:ico|png|jpg|gif|jpeg|ttf)$/,
        type: 'assets/resource',
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'assets' },

      // Fonts and SVGs: Inline files
      // { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'assets/inline' },
    ],
  },
  // externals: {
  //   axios: {
  //     amd: 'axios',
  //   },
  //   bootstrap: 'bootstrap',
  //   react: 'React', // Case matters here
  //   'react-dom': 'ReactDOM',
  //   'react-router-dom': 'react-router-dom',
  //   popperCore: {
  //     root: 'PopperJS',
  //     commonjs2: 'popper.js',
  //     commonjs: 'popper.js',
  //     amd: 'popper.js',
  //   },
  //   'react-router-dom': 'ReactRouter',
  //   redux: 'redux',
  //   'react-redux': 'react-redux',
  // },
  // externalsPresets: { web: false, webAsync: true },
  // optimization: {
  //   // fix node modules not packaged into zip
  //   concatenateModules: false,
  // },
};
