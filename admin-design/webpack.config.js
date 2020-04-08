const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
      style: './public/scss/style.scss',
      home: './Components/home.js'
  },
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public/dist')
  },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                { loader: MiniCssExtractPlugin.loader },
                {
                    loader: 'css-loader',
                    options: {
                        import: true,
                        url: true,
                    },
                }
            ],
        },
        {
            test: /\.s[ac]ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: 'css-loader',
                    options: {
                        import: true,
                        url: true,
                    },
                },
                {
                    loader: 'sass-loader',
                },
            ],
        }
    ]
  }
};