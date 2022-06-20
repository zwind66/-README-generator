// Declaring the dependencies and variables
const { writeFile, copyFile } = require('./utils/generate.js');
const inquirer = require('inquirer');
const generateReadme = require('./utils/generateMarkdown.js');

//Prompt the user questions and generate responses
const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: "What is the project title?(Required)",
            validate: projectTitleInput => {
                if (projectTitleInput) {
                    return true;
                } else {
                    console.log('Please enter your project title!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username? (Required)",
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is your email? (Required)",
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter your email!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Write a brief description of your project: (Required)",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmImg",
            message: "Would you like to add a description img? (Optional)",
            default: true,
        },
        {
            type: "input",
            name: "img",
            message: "Provide a description Img by URL:",
            when: ({ confirmImg }) => confirmImg
        },
        {
            type: "confirm",
            name: "confirmVideo",
            message: "Would you like to showing video for the application? (Optional)",
            default: true,
        },
        {
            type: "input",
            name: "video",
            message: "Provide a video by URL:",
            when: ({ confirmVideo }) => confirmVideo
        },
        {
            type: "input",
            name: "uesrStory",
            message: "Write a user story: (optional)",
        },
        {
            type: "input",
            name: "acceptanceCriteria",
            message: "Write acceptance criteria: (optional)",
        },
        {
            type: "input",
            name: "installation",
            message: "What are the steps required to install your project? (Required)",
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please enter steps required to install your project!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "usage",
            message: "What is this project usage for? (Required)",
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please enter usage for this project!');
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have? (Required)",
            choices: ["Apache", "Academic", "GNU", "ISC", "MIT", "Mozilla", "Open", "Other"],
            validate: licenseInput => {
                if (licenseInput) {
                    return true;
                } else {
                    console.log('Please choose a license for this project!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "contributing",
            message: "Who are the contributors of this projects? (Required)",
            validate: contributingInput => {
                if (contributingInput) {
                    return true;
                } else {
                    console.log('Please enter contributors for this project!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "tests",
            message: 'What command should be run to run tests?',
            default: 'npm test'
        },
    ]);
} // End of promptUser

// function call to initialize program
promptUser()
    // getting user answers 
    .then(answers => {
        return generateReadme(answers);
    })
    // writing the README file
    .then(data => {
        return writeFile(data);
    })
    // copying the index.js file
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    }) // console.log the response
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    }) // end of promise chain
    .catch(err => {
        console.log(err);
    });