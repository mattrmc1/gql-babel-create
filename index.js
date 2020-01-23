#!/usr/bin/env node
const exec = require("child_process").exec;
const rmrf = require('rimraf');
const chalk = require('chalk');
const inquirer = require('./lib/inquirer');

let processArgs = process.argv.splice( 2 );
const GIT_REPOSITORY = "https://github.com/mattrmc1/graphql-babel-template.git";

const success = (name, path) => `
${chalk.green("Success!!")}
Created ${chalk.yellow(name)} at ${chalk.yellow(path + '/' + name)}

  ${chalk.cyanBright('yarn start')}
    Starts the server from dist folder

  ${chalk.cyanBright('yarn dev')}
    Starts the development server

  ${chalk.cyanBright('yarn clean')}
    Removes the dist folder

  ${chalk.cyanBright('yarn build')}
    Builds server to dist folder

  ${chalk.cyanBright('yarn test')}
    Runs all tests (jest)

Get started:

  cd ${chalk.yellow(name)} && yarn
  yarn dev

Happy coding!
`;

const run = async () => {
  let name = processArgs[0];
  if (!name)
    name = await inquirer.getProjectName();
  
  // TODO: Check if path exists

  const task = exec(`git clone ${GIT_REPOSITORY} ${name}`);
  task.on('close', res => {
    if (res === 0){
      // TODO: Should I use path instead of process.cwd() ?
      const pathToDelete = `${process.cwd()}/${name}/.git`;
      console.log(pathToDelete);
      rmrf(pathToDelete, {}, () => {
        // TODO: yarn install and shit
        let message = success(name, process.cwd());
        console.log(message);
      });
    }
  })
};

run();