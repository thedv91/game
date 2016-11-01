import path from 'path';
import webpack from 'webpack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');


export default {
	debug: true,
	devtool: 'eval',
	noInfo: true,
	entry: [
		'whatwg-fetch',
		'./src/app'
	],
	target: 'web',
    devServer: {
        contentBase: './src'
    },
	output: {
		path: __dirname + '/dist',
		filename: 'app.bundle.js',
		libraryTarget: 'var',
		library: 'QsoftGame',
		publicPath: '/',
	},
	externals: {
		Phaser: "Phaser"
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			include: path.join(__dirname, 'src'),
			loader: 'babel',
			query: {
				cacheDirectory: true,
			}
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
		extensions: ["", ".webpack.js", ".web.js", ".js"],
		modulesDirectories: ["game", "node_modules"]
	}
};