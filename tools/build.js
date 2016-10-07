import Webpack from 'webpack';
import config from './../webpack.config.prod';

Webpack(config).run((err, stats) => {
	stats.toJson();
});