import { dirname, join } from 'path';
import { asyncProcess } from '../utils/scriptUtils.js';

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));

console.log(__dirname);
debugger;
(async () => {
	console.log('Cloning Imgur Clone');

	// ============================
	// ==== Imgur Installation ====
	// ============================

	try {
		await asyncProcess('git clone https://github.com/Twiggeh/ImgurClone', {
			cwd: join(__dirname, '../'),
			shell: true,
		})[0];
	} catch (e) {
		console.error('Could not download Imgur Clone.');
		console.error(e);
	}
	try {
		console.log('Starting Imgur installation');
		await asyncProcess('node ./scripts/setup.js', {
			cwd: join(__dirname, '../ImgurClone'),
			shell: true,
			ignoreErrors: true,
		})[0];
	} catch (e) {
		console.error('Could not install Imgur.');
		console.error(e);
	}

	// ================================
	// ==== Portfolio Installation ====
	// ================================

	try {
		console.log('Installing Client dependencies');
		await asyncProcess('yarn', {
			cwd: join(__dirname, '../client'),
			shell: true,
		})[0];
	} catch (e) {
		console.error('Could not install client dependencies.');
		console.error(e);
	}

	try {
		console.log('Installing Server dependencies');
		await asyncProcess('yarn', {
			cwd: join(__dirname, '../server'),
			shell: true,
		})[0];
	} catch (e) {
		console.error('Could not install server dependencies.');
		console.error(e);
	}
	// TODO: Build server and client once

	console.log('Done :D');

	process.exit(0);
})();
