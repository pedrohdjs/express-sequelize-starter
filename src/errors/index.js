const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const errors = {};

//Autoload errors
fs
    .readdirSync(__dirname)
    .filter(file => {//Remove files that aren't .js files and the current file
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {//Require and use all routes in the folder
        const error = path.join(__dirname, file);
        errors[file.slice(0,-3)] = require(error);
    })
 
module.exports = errors;