#!/usr/bin/env node

import {Command} from 'commander';
import {run} from './commands/run';
import {find, json} from '../utils';

//cli entry point
(() => {
	const program = new Command('jael');
	// load the config file.  should be in cwd
	const configFile = find('.jael');

	// Read the contents as json
	const configObject = json(configFile);

	program
		.description('inject env at runtime [jael -- yourcommand]')
		.option('-p, --profile <string>', 'The profile to use', 'default')
		.action(async (command, args, cmdObj) => {
			const config = configObject[command.profile];
			if (!config) {
				console.error(`Unknown profile ${command.profile}`);
				return;
			}
			let vars: any = {};
			for (const c of config) {
				//TODO: check the module is an approved module
				//TODO: check for multiple inputs
				//load extension
				let module: any = null;
				try {
					module = require(c.module);
				} catch (er) {
					console.error(
						`Unable to load module ${c.module} please make sure it is install using \`npm i ${c.module}\``
					);
					return;
				}
				const response = await module.exec(c);
				//TODO: cleanup this so we arent recreating
				//TODO: override flag dont let one env source override another throw if 2 contain the same key
				vars = {...vars, ...response};
			}
			run(vars, args);
		});

	program.parse(process.argv);
})();
