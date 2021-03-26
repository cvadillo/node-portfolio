const inquirer = require('inquirer');
// Adding Functions to our required set 
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
	return inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'What is your name?',
				validate: nameInput => {
					if (nameInput) {
						return true;
					} else {
						console.log('I need yo name, Son!');
						return false;
					}
				}
			},
			{
				type: 'input',
				name: 'github',
				message: 'Enter your GitHub Username',
				validate: githubInput => {
					if (githubInput) {
						return true;
					} else {
						console.log('If you wanna wrangle GitHub Cats, enter your username!');
						return false;
					}
				}
			},
			{
				type: 'input',
				name: 'about',
				message: 'Provide some information about yourself:'
			}
		]);
};

const promptProject = portfolioData => {

	// Initialize portfolioData.projects
	if (!portfolioData.projects) {
		portfolioData.projects = [];
	}

	console.log(`
=================
Add a New Project
=================
		`);
	return inquirer.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of your project?',
				validate: projectInput => {
					if (projectInput) {
						return true;
					} else {
						console.log('Projects without names make me a sad Panda :-(');
						return false;
					}
				}
			},
			{
				type: 'input',
				name: 'description',
				message: 'Please describe your project (Required):',
				validate: desInput => {
					if (desInput) {
						return true;
					} else {
						console.log('How will you make it in this world with no description?');
						return false;
					}
				}
			},
			{
				type: 'checkbox',
				name: 'languages',
				message: 'What did you buid this project with? (Check all that apply)',
				choices: ['Javascript', 'HTML5', 'CSS3', 'ES6', 'JQuery', 'Bootstrap', 'Node', 'Other']
			},
			{
				type: 'input',
				name: 'link',
				message: 'Enter the GitHub link to your project. (Required)',
				validate: gitLinkInput => {
					if (gitLinkInput) {
						return true;
					} else {
						console.log('How will all the pretty people see your project without a link?');
						return false;
					}
				}
			},
			{
				type: 'confirm',
				name: 'feature',
				message: 'Would you like to feature this project?',
				default: false
			},
			{
				type: 'confirm',
				name: 'confirmAddProject',
				message: 'Would you like to enter another project?',
				default: false
			}
		])

		.then(projectData => {
				portfolioData.projects.push(projectData);
				if (projectData.confirmAddProject) {
					return promptProject(portfolioData);
				} else {
					return portfolioData
				}
			});
};

promptUser()
	.then(promptProject)
	.then(portfolioData => {
		console.log(portfolioData);
	});