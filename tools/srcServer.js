/*eslint-disable no-console */

import webpack from 'webpack';
import express from 'express';
import open from 'open';
import path from 'path';

import config from '../webpack.config.dev';

const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: false,
    publicPath: config.output.publicPath
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// __dirname is whatever dir this server is running out of

/*
	no-cache
	no-store
	must-revalidate
*/
app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	next();
  });

app.use("/blockApp", require('./routes/blockAppRoutes'));
app.use("/hashApp", require('./routes/hashAppRoutes'));
app.use("/basicRoutingApp", require('./routes/basicRoutingAppRoutes'));
app.use("/", require('./routes/mainAppRoutes'));

app.listen(port, function(err) {
	if (err) {
		console.log(err); //eslint-disable-line no-console
	}
	else {
		console.log('App listening on port 3000');
		open(`http://localhost:${port}`);
	}
});
