const inquirer = require('inquirer');

module.exports = {
  getProjectName: async () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: `What's the name of your project?`,
        validate: value => {
          if (value.length)
            return true;
          else
            return "Project name can't be blank"
        }
      }
    ];
    let res = await inquirer.prompt(questions);
    return res.name;
  }
};