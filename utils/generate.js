// Declaring
const fs = require('fs');

// function to write README file using file system 
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md',fileContent, err => {
            // if there is an error 
            if (err) {
                reject(err);
                return;
            }
            // when the README has been created 
            resolve({
                ok: true,
                message: "Your README has been successfully created!"
            });
        }
        );
    });
};

const copyFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./index.js', './dist/index.js', err => {
            // if there's an error
            if (err) {
                reject(err);
                return;
            }
            // if everything went well
            resolve({
                ok: true,
                message: 'File copied!'
            });
        });
    });
};

// exporting the functions
module.exports = { writeFile, copyFile };