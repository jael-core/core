const fs = require('fs');
const path = require('path');

export function find(...args: any[]) {
	const rel = path.join.apply(null, [].slice.call(args));
	return path.join(process.cwd(), rel);
}

function parse(content: any) {
	if (/^\s*{/.test(content)) {
		return JSON.parse(content);
	}
	return undefined;
}

function file(...args: any[]) {
	const nonNullArgs = [].slice.call(args).filter((arg: any) => arg != null);

	// path.join breaks if it's a not a string, so just skip this.
	for (let i = 0; i < nonNullArgs.length; i++) {
		if (typeof nonNullArgs[i] !== 'string') {
			return;
		}
	}

	const file = path.join.apply(null, nonNullArgs);
	try {
		return fs.readFileSync(file, 'utf-8');
	} catch (err) {
		return undefined;
	}
}

export function json(...args: any[]) {
	const content = file.apply(null, args);
	return content ? parse(content) : null;
}
