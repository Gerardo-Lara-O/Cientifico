const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = { // objeto que define la configuracion
    entry: './src/index.js', // Archivo de entrada
    // mode: "production",
    output: {  // Configuracion de salida
        path: path.resolve(__dirname, 'dist'), // Ruta absoluta para los archivos generados
        filename: 'main.js', // Nombre del archivo de salida
    },
    resolve: { // Configura cómo Webpack resuelve las importaciones en tu proyecto.
        extensions: ['.js'], // Especifica las extensiones de archivo que Webpack debe resolver automáticamente
    },
    module: { // Define cómo Webpack debe procesar diferentes tipos de archivos mediante reglas específicas.
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [ // Define una lista de plugins que añaden funcionalidades adicionales al proceso de compilación.
        new HtmlWebpackPlugin(
            {
                inject: true,
                template: './public/index.html',
                filename: './index.html'
            }
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/styles/styles.css'), // Carpeta de origen
                    to: 'styles/', // Carpeta de destino dentro de dist
                },
            ],
        }),
        new MiniCssExtractPlugin(),

    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Carpeta de los archivos estáticos
        },
        compress: true, // Habilita la compresión gzip
        historyApiFallback: true, // Soporte para SPAs
        port: 3006, // Puerto del servidor
        open: true, // Abre el navegador automáticamente al iniciar el servidor
    }
}