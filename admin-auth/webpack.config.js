const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        main: ['./public/scss/style.scss'],
        home: './Components/home.js',
        login: './Components/login.js',
        header: './Components/header.js',
        signup: ['./Components/signup.js', './public/scss/signup.scss']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new Dotenv({
            path: './.env'
        })
    ],
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {loader: MiniCssExtractPlugin.loader},
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
        ],
    }
};