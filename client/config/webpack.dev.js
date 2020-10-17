const path = require('path');
const process = require('process');
require('dotenv').config();
const mode = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(mode);
const curProcess = process.cwd();

module.exports = {
	entry: ['react-hot-loader/patch', path.resolve(curProcess, 'src')],
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(curProcess, 'src/'),
		historyApiFallback: true,
		hot: true,
		compress: true,
	},
	mode: 'development',
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
				test: /\.css?$/,
				use: ['style-loader', 'css-loader'],
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
						name: '[name].[ext]',
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
			icons: path.resolve(curProcess, './src/assets/icons'),
			assets: path.resolve(curProcess, './src/assets'),
			pictures: path.resolve(curProcess, './src/static/Pictures.js'),
		},
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx'],
	},
	node: { __dirname: true, __filename: true }, // to get correct __dirname and __filename
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(curProcess, 'src/index.html'),
			filename: 'index.html',
		}),
	],
};
