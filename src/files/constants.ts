import { resolve } from 'path';

export const SAVE_FILE_DIR = getSaveFileDir();

function getSaveFileDir() {
	if (process.platform === 'win32') {
		return resolve(process.env.PROGRAMDATA, 'mopdocs-be');
	}

	if (process.platform === 'linux') {
		return '/var/lib/mopdocs-be';
	}

	throw new Error(
		`Server detected you are on ${process.platform}, however we support only windows and linux`,
	);
}
