const { resolve } = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports= {
    mode: "development",
    entry: './src/main.js',
    output: {
        path: resolve (__dirname, 'build'),
        filename: 'src/main.[contenthash].js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
              },
            ],
          },
          {
            test: /\.(s[ac]ss|css)$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          {
            test: /\.(png|jpg|svg|gif)$/,
            use: [
              {
                loader: "img-optimize-loader",
                options: {
                  compress: {
                    mode: "high",
                    webp: true,
                    gifsicle: true,
                    disableOnDevelopment: false,
                  },
                },
              },
            ],
          },
          {
            test: /\.(mp[3/4])$/,
            loader: "file-loader",
          },
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "index.html",
        }),
    
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
    
        new CopyPlugin({
          patterns: [
            {
              from: "sound",
              to: "media",
              toType: "dir",
            },
          ],
        }),
      ],
      devServer: {
        port: 3000,
      },
}