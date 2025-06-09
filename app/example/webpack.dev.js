const path = require("path");
const appWebpackDevConfig = require("../webpack.dev");
const { merge } = require("webpack-merge")

const merged = merge(appWebpackDevConfig({context: path.resolve(__dirname, "../"), browserMainImport: path.resolve(__dirname, "./src/index.ts")}), {
  mode: "development",
  // entry: "./example/index.ts",
  resolve: {
    alias: {
      "customized-signal": path.resolve(__dirname, "../src/lib.tsx"),
    },
  },
})
module.exports = merged;
console.log("merged=", merged);