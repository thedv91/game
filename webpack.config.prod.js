import path from 'path';
import webpack from 'webpack';

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');


export default {
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		'./src/app'
	],
	output: {
		path: './dist',
		// path: './api/public/dist',
		filename: 'app.bundle.js',
		libraryTarget: 'var',
		library: 'QsoftGame'
	},
	devtool: 'cheap-source-map',
	externals: {
		Phaser: 'Phaser'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			include: path.join(__dirname, 'src'),
			loader: 'babel-loader'
		}, {
			test: /pixi\.js/,
			loader: 'expose?PIXI'
		}, {
			test: /phaser-split\.js$/,
			loader: 'expose?Phaser'
		}, {
			test: /p2\.js/,
			loader: 'expose?p2'
		}, {
			test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			include: path.join(__dirname, 'assets'),
			loader: 'file-loader?limit=100000'
		}]
	},
	resolve: {
		alias: {
			'phaser': phaser,
			'pixi': pixi,
			'p2': p2

		},
		extensions: ['', '.webpack.js', '.web.js', '.js'],
		modulesDirectories: ['game', 'node_modules']
	}
};