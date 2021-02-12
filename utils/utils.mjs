export const readLine = () =>
	createInterface({ input: process.stdin, output: process.stdout });

export const getDirName = () => decodeURI(dirname(new URL(import.meta.url).pathname));

/**
 * @returns {{res: ()=>void, rej: ()=>void, p: Promise<void> }}
 */
export const createLock = () => {
	const lock = {};
	lock.p = new Promise((res, rej) => {
		lock.res = res;
		res.rej = rej;
	});
	return lock;
};

/**
 * @param {string} question
 * @returns {Promise<string>}
 */
export const asyncReadLine = async question => {
	const questionLock = createLock();
	rl.question(question, questionLock.res);
	return questionLock;
};

/**
 * Wait for a process to exit or for a process to reach a flag
 *
 * @param {string} command
 * @param {import('child_process').SpawnOptionsWithoutStdio} opts
 * @param {string} [outputNeedsToEqual]
 *
 * @returns {[Promise<void>, import('child_process').ChildProcessWithoutNullStreams]}
 */
export const asyncProcess = (command, opts, outputNeedsToEqual) => {
	const procLock = createLock();
	const subProc = spawn(command, opts);

	if (outputNeedsToEqual) {
		subProc.stdout.on('data', data => {
			const strData = data.toString();
			console.log(strData);
			if (strData.includes(outputNeedsToEqual)) procLock.res();
		});
	} else {
		subProc.on('exit', procLock.res);
		subProc.stdout.on('data', data => console.log(data.toString()));
	}

	subProc.stderr.on('data', e => {
		const nonErrors = [
			'Debugger attached.\n',
			'Waiting for the debugger to disconnect...\n',
		];
		/**
		 *  @type { string }
		 */
		const strErr = e.toString();
		console.error(strErr);
		if (strErr.includes('DeprecationWarning:')) return;
		if (nonErrors.includes(strErr)) return;
		throw strErr;
	});

	return [procLock.p, subProc];
};
