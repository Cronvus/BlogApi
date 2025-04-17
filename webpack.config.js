const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    // Точка входа
    entry: './src/index.tsx', // Ваш основной файл

    // Выходной файл
    output: {
        path: path.resolve(__dirname, 'dist'), // Папка для собранных файлов
        filename: 'bundle.js', // Имя выходного файла
    },

    // Разрешаем расширения
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.png', '.jpg', '.svg'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@types': path.resolve(__dirname, 'src/types/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@constants': path.resolve(__dirname, 'src/constants/'),
            '@services': path.resolve(__dirname, 'src/services/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@views': path.resolve(__dirname, 'src/views/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@context': path.resolve(__dirname, 'src/context/'),
            '@tests': path.resolve(__dirname, 'src/tests/'),
            '@config': path.resolve(__dirname, 'src/config/'),
            '@middleware': path.resolve(__dirname, 'src/middleware/'),
            '@store': path.resolve(__dirname, 'src/store/')
        },
    },

    // Настройки загрузчиков и плагинов
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Преобразование TypeScript файлов
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // Преобразование CSS файлов
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$/, // Преобразование JS файлов с помощью Babel
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },

    // Плагины
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Используем наш HTML шаблон
            favicon: './src/assets/icons/favicon.svg', // Указываем путь к SVG-файлу
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'], // Линтинг для этих файлов
        }),
    ],

    // Настройки для DevServer
    devServer: {
        static: path.join(__dirname, 'dist'), // Папка с результатами сборки
        port: 3000, // Порт на котором будет запускаться приложение
        open: true, // Автоматически открывать браузер
        hot: true, // Включаем Hot Module Replacement
    },

    // Сохранение исходных карт
    devtool: 'source-map', // Для дебага
};
