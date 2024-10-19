import childProcess from 'node:child_process';

export async function run(envs: any, command: any) {
	// set processEnv
	for (const key of Object.keys(envs)) {
		process.env[key] = envs[key];
	}

	executeCommand(command, process.env);
}

async function executeCommand(commandArgs: any, env: any) {
	let commandProcess: any = null;
	try {
		//this will block until the child Process exits
		const results = await new Promise((resolve, reject) => {
			const spawned = childProcess.spawn(
				commandArgs.args[0],
				commandArgs.args.slice(1),
				{stdio: 'inherit', env: {...env}}
			);
			spawned.send;
			spawned.on('exit', (exitCode: any, signal: any) => {
				resolve({exitCode, signal});
			});

			spawned.on('error', (error: any) => {
				reject(error);
			});

			if (spawned.stdin) {
				spawned.stdin.on('error', (error: any) => {
					reject(error);
				});
			}
		});
	} catch (error) {
		console.log(error);
		process.exit(error.exitCode || 1);
	}
}
