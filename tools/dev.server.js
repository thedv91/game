import Express from 'express';
import Webpack from 'webpack';
import config from './../webpack.config.dev';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';

const app = Express();

const compiler = Webpack(config);

const port = process.env.NODE_ENV || 3000;

app.use(devMiddleware(compiler, {
	publicPath: config.output.publicPath,
	noInfo: false,
	quiet: false,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false
	},
}));

app.use(hotMiddleware(compiler));
app.use(Express.static(__dirname + '/../'));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, './../index.html'));
});

const server = app.listen(port, () => {
	const port = server.address().port;
	console.log(`Listening at port: ${port}`);
});