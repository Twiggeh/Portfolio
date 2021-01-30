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
import { body, validationResult } from 'express-validator';
import { config } from 'dotenv';
config();

const SECURE_PORT = 8080;
const UPGRADE_PORT = 8081;
const DEV_PORT = 5050;

const isProd = process.env.NODE_ENV === 'production';
const secureServerPort = isProd ? SECURE_PORT : DEV_PORT;
const upgradeServerPort = UPGRADE_PORT;

const __dirname = dirname(new URL(import.meta.url).pathname);

const app = express();

if (!isProd) {
	const cypressMiddleware = (await import('@cypress/code-coverage/middleware/express.js'))
		.default;
	cypressMiddleware(app);
}

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
	'http://localhost:5000',
	'http://127.0.0.1:5000',
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
	res.header(
		'Access-Control-Allow-Origin',
		isProd ? 'https://www.twiggeh.xyz' : 'localhost:5000'
	);
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

if (isProd) {
	app.use((req, res, next) => {
		if (req.hostname.startsWith('www.')) return next();
		res.redirect(301, `https://www.${req.hostname}${req.url}`);
	});
}

app.post(
	'/api/v1/submit',
	[
		body('email', 'Empty or Invalid Email').isEmail(),
		body(
			'subject',
			'Needs to be a value of "software", "art", "art training", "software training" or "other".'
		)
			.escape()
			.isIn(['software', 'art', 'art training', 'software training', 'other']),
		body('message', 'No message provided.').escape().trim().isLength({ min: 1 }),
	],
	async (req, res) => {
		const errors = validationResult(req).array();
		if (errors?.length !== 0) {
			return res.send({
				state: 'Failure',
				message: errors.map(err => err.msg),
				formData: req.body,
			});
		}

		const myFS = new FormSubmission();
		myFS.email = req.body.email;
		myFS.date = myDate.toISOString();
		myFS.subject = req.body.subject;
		myFS.message = req.body.message;

		try {
			await myFS.save();
			res.send({ state: 'Success', message: 'Message has been received.' });
		} catch {
			res.send({
				state: 'Failure',
				message: 'Please try again later, message could not be saved.',
			});
		}
	}
);

app.get('/api/v1/socket_playground', async () => {
	// TODO : Add socket playground
});

app.get('/public/*', (req, res) => {
	res.sendFile(resolve(cwd(), join('../client', 'dist', req.url)));
});

app.get('*', (req, res) => {
	res.sendFile(resolve(cwd(), '../client', 'dist', 'index.html'));
});

if (isProd) {
	http
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
		.listen(upgradeServerPort, () => {
			console.log(`Http upgrade server online on port ${upgradeServerPort}`);
		});

	https
		.createServer(
			{
				key: readFileSync(resolve(cwd(), 'cert', 'privkey.pem')),
				cert: readFileSync(resolve(cwd(), 'cert', 'fullchain.pem')),
			},
			app
		)
		.listen(secureServerPort, () => {
			console.log(`Secure Server is listening on port ${secureServerPort}`);
		});
} else {
	app.listen(secureServerPort, () => {
		console.log(`Dev server is listening on port ${secureServerPort}`);
	});
}
