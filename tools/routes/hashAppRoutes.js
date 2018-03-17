'use strict';

import express from 'express';
import path from 'path';

const router = express.Router();

/* eslint-disable no-console */

router.route('/')
	.get((req, res) => {
        let pageName;
        console.log("environment is " + process.env['NODE_ENV']);

        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/hashApp.html') :
            pageName = path.join(__dirname + '/../../dist/hashApp.html');

		console.log("entered /hashapp route. ");
		res.sendFile(pageName);
	});

module.exports = router;
