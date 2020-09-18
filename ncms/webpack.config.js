const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: ['./public/js/main.js', './public/scss/style.scss'],
        login: ['./components/login.js'],
        home: ['./components/home.js'],
        patient: ['./components/patient.js'],
        bed: ['./components/bed.js'],
        doctor: ['./components/doctor.js'],
        nurse: ['./components/nurse.js'],
        call_history: ['./components/call_history.js'],
        real_time_call: ['./components/real_time_call.js'],
        daily_patient_nurse_report: ['./components/daily_patient_nurse_report.js'],
        monthly_patient_nurse_report: ['./components/monthly_patient_nurse_report.js'],
        user: ['./components/user.js'],
        settings: ['./components/settings.js'],
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
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"webpack"',
            'global': {},
        })
    ],
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
                            url: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    // target: 'node',
    externals: {
        'aws-sdk': 'aws-sdk',
        'fs':'fs',
        'bcrypt':'bcrypt',
        'mongodb-client-encryption': 'mongodb-client-encryption',
        'require_optional': 'require_optional',
    },
    node: {
        global: true,
        fs: "empty",
        bcrypt: "empty",
    },
};