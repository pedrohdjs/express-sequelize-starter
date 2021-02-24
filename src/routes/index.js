const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

//Autoload all .js files in the current directory
fs
    .readdirSync(__dirname)
    .filter(file => {//Remove files that arent.js files and the current file
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {//Require and use all routes in the folder
        const route = path.join(__dirname, file);
        router.use(require(route));
    })

module.exports = router;
