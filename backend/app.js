// import installed dependencies
require(dotenv).config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

import { log } from 'console';
// import native dependencies
import path from 'path';
import { fileURLToPath } from 'url';

// configurations
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appUsage = [
	express.json(),
	helmet(),
	helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }),
	morgan('common'),
	bodyParser.json({ limit: '30mb', extended: true }),
	bodyParser.urlencoded({ limit: '30mb', extended: true }),
	cors(),
];

app.use(appUsage);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// file storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/assets');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// run backend
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
