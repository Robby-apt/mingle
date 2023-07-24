// import installed dependencies
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

// import native dependencies
import path from 'path';
import { fileURLToPath } from 'url';

// configurations
dotenv.config();
const app = express();
const port = process.env.PORT || 6001;
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

// mongoose setup
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
	// run backend
	app.listen(port, () => {
		console.log(`Listening on port ${port}`)
	})
}).catch((err)=>{
    console.log(`${err} did not connect`);
})
