const port = process.env.PORT || 8080;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');

module.exports = {
    entry: "./src/index.js",
    output:{
        path: path.join(__dirname, '/dist'),
        filename: 'main.[fullhash].js'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif|mpc|mps|mpb|cxc|cxs|cxb|tga|mtl|fbx|ico)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath: 'assets'
                    }
                  },
                ],
              },
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.json$/,
                use: ['json-loader'],
                type: 'javascript/auto'
              },
              {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
              },
              {
                test: /\.(glb|gltf)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                          name: '[name].[ext]',
                          outputPath: 'assets/'
                        }
                    }
                ]
            },

            {
                test: /\.obj/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                          name: '[name].[ext]',
                          outputPath: 'assets/'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    devServer:{
        https: true,
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}