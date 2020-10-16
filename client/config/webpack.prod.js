const path = require('path');
const process = require('process');
require('dotenv').config();
const mode = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(mode);
const curProcess = process.cwd();

module.exports = {
	entry: path.resolve(curProcess, 'src'),
	output: {
		path: path.resolve(curProcess, './dist'),
		publicPath: '/',
		filename: 'public/js/[name]-[contentHash:8].js',
		chunkFilename: 'public/js/[name]-[contentHash:8].chunk.js',
	},
	mode: 'production',
	module: {
		rules: [
			{
				enforce: 'pre',
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				loader: [{ loader: 'eslint-loader' }],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-react'],
					// don't inject babel code into each file, create a global import for them
					plugins: ['@babel/plugin-transform-runtime'],
					compact: false,
					cacheDirectory: true,
					cacheCompression: false,
					sourceMaps: true,
					inputSourceMap: true,
				},
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'public/fonts/',
						},
					},
				],
			},
			{
				test: /\.(jpg|jpeg|png|webp)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]-[contentHash:8].[ext]',
						outputPath: 'public/images/',
					},
				},
			},
			{
				test: /\.svg$/,
				use: [
					'babel-loader',
					{
						loader: 'react-svg-loader',
						options: {
							svgo: {
								plugins: [{ removeDimensions: true, removeViewBox: false }],
								floatPrecision: 2,
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
			icons: path.resolve(process.cwd(), './src/assets/icons'),
		},
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx'],
	},
	node: { curProcess: true, __filename: true }, // to get correct curProcess and __filename
	plugins: [
		new UglifyJSPlugin(),
		new MiniCssExtractPlugin({
			filename: 'public/css/[name]-[contenthash:8].css',
			chunkFilename: 'public/css/[name]-[contenthash:8].chunk.css',
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(curProcess, 'src/index.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
	],
};
