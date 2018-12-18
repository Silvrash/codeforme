var path = require('path');
// var WriteFilePlugin = require('write-file-webpack-plugin');


const ENTRY_DIR = path.resolve(__dirname, 'app/static/javascript/src');
const OUTPUT_DIR = path.resolve(__dirname, 'app/static/javascript/bin');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./app/templates/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: ENTRY_DIR + '/index.js',
	output: {
		path: OUTPUT_DIR,
		filename: 'bundles.js'
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [htmlPlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
  }
};
