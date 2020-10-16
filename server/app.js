import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import keys from './keys/keys.js';
import { join, resolve } from 'path';
import FormSubmission from './Models/FormSubmission.js';
import { cwd } from 'process';

const app = express();

app.disable('x-powered-by');

const allowedOrigins = [
	'http://localhost:8080',
	'http://127.0.0.1:8080',
	'http://www.twiggeh.xyz',
	'http://localhost:5000',
	undefined,
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(keys.mongoose, { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
	res.header('X-XSS-Protection', '1; mode=block');
	res.header('X-Frame-Options', 'deny');
	res.header('X-Content-Type-Options', 'nosniff');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

app.use(
	cors({
		origin: (origin, cb) => {
			if (!allowedOrigins.includes(origin)) {
				const msg = `The CORS policy doesn't allow access from ${origin}.`;
				return cb(msg, false);
			}
			return cb(null, true);
		},
	})
);

app.post('/api/submit', async (req, res) => {
	console.log(req.body);
	//const formSubmission = new FormSubmission({
	//
	//})
});

app.get('/public/*', (req, res) => {
	res.sendFile(resolve(cwd(), join('../client', 'dist', req.url)));
});

app.get('*', (req, res) => {
	res.sendFile(resolve(cwd(), '../client', 'dist', 'index.html'));
});

app.listen(5000, () => {
	console.log('Online on Port 5000');
});
