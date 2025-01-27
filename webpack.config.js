const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = { // objeto que define la configuracion
    entry: './src/index.js', // Archivo de entrada
    // mode: "production",
    output: {  // Configuracion de salida
        path: path.resolve(__dirname, 'dist'), // Ruta absoluta para los archivos generados
        filename: '[name].[contenthash].js', // Nombre del archivo de salida
        clean: true,
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
                    to: 'styles/[name].[contenthash].css', // Carpeta de destino dentro de dist
                },
            ],
        }),
        new MiniCssExtractPlugin(
            {
                filename: 'styles/[name].[contenthash].css', // Genera un archivo CSS con hash
            }
        ),

    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Carpeta de los archivos estáticos
        },
        compress: true, // Habilita la compresión gzip
        historyApiFallback: true, // Soporte para SPAs
        port: 3006, // Puerto del servidor
        open: true, // Abre el navegador automáticamente al iniciar el servidor
    },
    optimization: {
        minimize: true, // Activa la minimización
        minimizer: [
            new CssMinimizerPlugin(), // Minimiza el CSS
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Elimina console.log del código final
                    },
                },
            }),
        ],
    },
}