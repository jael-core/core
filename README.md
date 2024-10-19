Jael (jay-el) - Just Another Env Loader

I built this project as a way to load env variables from AWS Secrets Manager. I have plans to expand it to other services such as Azure key vault and more. It is currently just a poc and is not production ready.

### Quickstart

Install

```sh
npm install @jael-env/core --save
```

The core by itself is just an inject. We need one of the modules to do the actual loading of the envs to inject. Currently there is only an Aws Secrets Manager module

```sh
npm install @jael-env/aws_secrets_manager --save
```

Create your config at root of project - currently only have the aws_secrets_manager loader

```json
//.jael
{
	"default": [
		{
			"module": "@jael-env/aws_secrets_manager",
			"SecretId": "myAwsSecretId"
		}
	]
}
```

Your config can have muliple profiles or even load muliple sources and inject them all

```json
//.jael
{
	"default": [
		{
			"module": "@jael-env/aws_secrets_manager",
			"SecretId": "myAwsSecretId"
		}
	],
	"aws": [
		{
			"module": "@jael-env/aws_secrets_manager",
			"SecretId": "myAwsSecretId"
		},
		{
			"module": "@jael-env/aws_secrets_manager",
			"SecretId": "secret2"
		}
	]
}
```

Run from command line or npm script to inject the env

```sh
Inject default profile execute node index.js
$ jael node index.js
```

```sh
Inject aws profile
$ jael -p aws node index.js
```

&nbsp;
