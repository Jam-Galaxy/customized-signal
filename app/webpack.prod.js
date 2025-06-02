const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const CopyPlugin = require("copy-webpack-plugin")

const PUBLIC_PATH = '/customized-signal/';

module.exports = merge(common, {
  mode: "production",
  optimization: {
    concatenateModules: false,
    // splitChunks: {
    //   chunks: "all",
    // },
    splitChunks: false,
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist' + PUBLIC_PATH),
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/*.svg", to: "[name][ext]" },
        { from: "public/*.png", to: "[name][ext]" },
      ],
    }),
  ],
})
