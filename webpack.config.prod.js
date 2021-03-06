import webpack from 'webpack';
import path from 'path';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import colors from 'colors';

const extractCSS = new ExtractTextPlugin('[name].[contenthash].bundle.css');

process.env['NODE_ENV'] = 'production';

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify(process.env['NODE_ENV']),
	__DEV__: false
};

console.log(`ENV IS ${process.env['NODE_ENV']}`.yellow);

const minifyOptions =  {
	removeComments: true,
	collapseWhitespace: true,
	removeRedundantAttributes: true,
	useShortDoctype: true,
	removeEmptyAttributes: true,
	removeStyleLinkTypeAttributes: true,
	keepClosingSlash: true,
	minifyJS: true,
	minifyCSS: true,
	minifyURLs: true
};

export default {
	devtool: 'source-map',
	context: path.resolve(__dirname, "src"),
	entry: {
        mainapp: './mainapp/index.js',
        blockapp: './blockapp/index.js',
		hashapp: './hashapp/index.js',
		basicroutingapp: './basicrouting/index.js',
        vendor: ['react', 'react-dom', 'react-router-dom', 'semantic-ui-react']
    },
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].bundle.js'
	},
	plugins:[
		// Hash the files using MD5 so that their names change when the content changes.
		new WebpackMd5Hash(),

		// Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
		new webpack.DefinePlugin(GLOBALS),

		extractCSS,

		// Generate HTML file that contains references to generated bundles.
		//See here for how this works: 	https://github.com/jantimon/html-webpack-plugin/issues/218

		// blockapp
		new HtmlWebpackPlugin({
			template: 'templates/blockapp.ejs',
			filename: 'blockapp.html',
			chunks: ['vendor', 'votingapp', 'common'],
			favicon: 'favicon.ico',
			minify: minifyOptions,
			inject: 'body',
			trackJSToken: '21981c7d5c924151bc538a66e95cfc22'
		}),
		// main page
		new HtmlWebpackPlugin({
			template: 'templates/index.ejs',
			filename: 'index.html',
			chunks: ['vendor', 'mainapp', 'common'],
			favicon: 'favicon.ico',
			minify: minifyOptions,
			inject: 'body',
			trackJSToken: '21981c7d5c924151bc538a66e95cfc22'
			/* when injecting scripts into the head, the body is not ready yet, and trying to do GetElementById doesnt work */
		}),
		// hash app
		new HtmlWebpackPlugin({
			template: 'templates/hashapp.ejs',
			filename: 'hashapp.html',
			chunks: ['vendor', 'hashapp', 'common'],
			favicon: 'favicon.ico',
			minify: minifyOptions,
			inject: 'body',
			trackJSToken: '21981c7d5c924151bc538a66e95cfc22'
			/* when injecting scripts into the head, the body is not ready yet, and trying to do GetElementById doesnt work */
		}),
		// basic routing app
		new HtmlWebpackPlugin({
			template: 'templates/basicroutingapp.ejs',
			filename: 'basicroutingapp.html',
			chunks: ['vendor', 'basicroutingapp', 'common'],
			favicon: 'favicon.ico',
			minify: minifyOptions,
			inject: 'body',
			trackJSToken: '21981c7d5c924151bc538a66e95cfc22'
			/* when injecting scripts into the head, the body is not ready yet, and trying to do GetElementById doesnt work */
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common' // Specify the common bundle's name.
		}),
		//  Minify JS
		new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
	],
    module: {
        rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "tools"),
					path.resolve(__dirname, "test"),
					path.resolve(__dirname, 'node_modules/uid-generator') // this pkg was written in ES6
				],
				loaders: ['babel-loader']
			},
			{ test: /\.jsx$/, exclude: /node_modules/, loader: ['babel-loader'] },
			//{ test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
			{
				test: /\.css$/,
                use: extractCSS.extract({
						fallback: "style-loader",
                        use: 'css-loader'
                        // sourceMap setting is ignored when devtool is configured higher up
                        //options: { sourceMap: true }
                })
			},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff'
					}
				}]
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				use: ['file-loader']
			},
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 6000,
						name: 'images/[name].[ext]'
					}
				}]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'image/svg+xml'
					}
				}]
			},
			{
				test: /\.json/,
				loader: "json-loader"
			}
        ]
    }
};
