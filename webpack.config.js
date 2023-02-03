const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports =
{
    //Режим проекта и точка входа
    mode: 'development',
    entry: path.resolve(__dirname,'./src/main.js'),
    optimization:
    {
        runtimeChunk: 'single',
    },
    //Настройки сервера
    devServer:
    {
        watchFiles: [path.resolve(__dirname,"src")],
        historyApiFallback: true,
        port:3000,
        hot:true,
    },
    //Выходной main файл
    output:
    {
        filename: `[name].js`,
        path: path.resolve(__dirname,'dist')
    },
    module:
    {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader",'css-loader']
            },
            {
                //Компиляция из sass в css
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'postcss-loader',
                {
                    loader: 'sass-loader',
                    options:
                    {
                        //Файл с переменными и миксинами
                        additionalData: '@use "src/sass/_variablesAndGlobal.sass" as *',
                    }
                },]
            },
            {
                //Применение babel к js
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                //Обработка картинок, иконок, svg
                test: /\.(jpg|png|svg|ico)$/,
                use:
                [{
                    loader: 'file-loader',
                    options:
                        {
                            name: '[path]/[name].[ext]'
                        }
                },
                {
                    // Оптимизация всех изображений
                    loader: "webp-loader",
                    options:
                    {
                        quality: 100
                    }
                }]
            }],
    },
    plugins: [new HtmlWebpackPlugin(
{
            favicon: path.resolve(__dirname,'src/favicon.ico'),
            template: path.resolve(__dirname,'./src/index.html')
        }),
        new CleanWebpackPlugin()]
}