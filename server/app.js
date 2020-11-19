import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import https from 'https';
import keys from './keys/keys.js';
import { join, resolve, dirname } from 'path';
import FormSubmission from './Models/FormSubmission.js';
import { cwd } from 'process';
import { readFileSync, createWriteStream } from 'fs';
import http from 'http';
import morgan from 'morgan';
const __dirname = dirname(new URL(import.meta.url).pathname);

const app = express();

const logStream = createWriteStream(join(__dirname, 'access.log'), { flags: 'a' });
const myDate = new Date();

morgan.token('time', () => {
	return myDate.toISOString();
});

const logger = morgan(':time :url :method :remote-addr :user-agent :response-time ms', {
	stream: logStream,
});

app.disable('x-powered-by');

const allowedOrigins = [
	'https://localhost:8080',
	'https://127.0.0.1:8080',
	'https://www.twiggeh.xyz',
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

app.use(logger);

app.use((req, res, next) => {
	if (req.hostname.startsWith('www.')) return next();
	res.redirect(301, `https://www.${req.hostname}${req.url}`);
});

app.post('/api/v1/submit', async (req, res) => {
	console.log(req.body);
	//const formSubmission = new FormSubmission({
	//
	//})
});

app.get('/api/v1/socket_playground', async () => {
	// TODO : Add socket playground
});

app.get('/public/*', (req, res) => {
	res.sendFile(resolve(cwd(), join('../client', 'dist', req.url)));
});

app.get('*', (req, res) => {
	res.sendFile(resolve(cwd(), '../client', 'dist', 'index.html'));
});

const httpServer = http
	.createServer((req, res) => {
		console.log('Redirecting to: ', `https://www.twiggeh.xyz${req.url}`);
		logger(req, res, err => {
			if (err) console.error(err);
			res
				.writeHead(301, {
					Location: `https://www.twiggeh.xyz${req.url}`,
				})
				.end();
		});
	})
	.listen(8081, () => {
		console.log('http upgrade server online on port 8081');
	});

https
	.createServer(
		{
			key: readFileSync(resolve(cwd(), 'cert', 'privkey.pem')),
			cert: readFileSync(resolve(cwd(), 'cert', 'fullchain.pem')),
		},
		app
	)
	.listen(8080, () => {
		console.log('Secure Server is listening on port 8080');
	});
