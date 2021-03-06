# Express-Sequelize-Starter
A Node.js template repo for RESTful backend services built with Express.js and Sequelize.

### Contribuitors
- Shoutout to my friends [danielnaoexiste](https://github.com/danielnaoexiste) and [misterio77](https://github.com/misterio77) for their valuable and much appreciated help and feedback on the folder/file structure.
- The [Sequelize CLI](https://www.npmjs.com/package/sequelize-cli) was used and very helpful on the database connection setup and is to be entirely credited for src/models/index.js.
- The [Express generator](https://www.npmjs.com/package/express-generator) was used and very helpful on the basic express application setup and is to be credited for scripts/start.js.
  
### Notes
- Sequelize is configured to be used with SQLite. This can be changed by updating db.json and installing the adequate database drivers via npm according to your needs.

# Usage
This repository is supposed to be cloned and modified in order to bootstrap it's structure and quickly have your very own RESTful service up and running, without much need to worry about the initial folder structure or application setup. In order to keep things clean, organized and scalable, I'd reccommend you to understand and keep it's folder structure, but <b>it's up to you to decide what works better for you and your application</b>.
In order to run it, you may use the following npm commands:
```javascript
npm install
npm start
```


# Initial implementation
Initially, this repo is an implementation of a RESTful backend API containing CRUD operations for the User and Post resources, in order to provide examples of how to use this folder/file structure. This should be modified by the user to fit it's needs. This API may be accessed via HTTP requests, and initially supports the following calls:

|Method | URL               | Response
|-      |-                  |-          
|GET    |/users             |Returns all stored Users.
|POST   |/users             |Saves a new User to the database and returns it.
|GET    |/users/:id         |Returns the User with the given id.
|PUT    |/users/:id         |Updates the User with the given id and returns it.
|DELETE |/users/:id         |Deletes the User with the given id.
|GET    |/users/:id/posts   |Returns all Posts by the User with the given id.
|POST   |/users/:id/posts   |Saves a new Post, with the User with the given id as it's author and returns it.
|GET    |/posts             |Returns all stored Posts.
|POST   |/posts             |Saves a new Post to the database and returns it.
|GET    |/posts/:id         |Returns the Post with the given id.
|PUT    |/posts/:id         |Updates the Post with the given id and returns it.
|DELETE |/posts/:id         |Deletes the Post with the given id.

You are encouraged to write similar documentation to your REST API.

# Folder Structure explanation

### /scripts
This folder should contain your npm scripts, such as start, test, etc.

### /src
This folder should contain your application's source code.

### /src/config
JSON files for basic configurations, such as CORS, database connections, etc.

### /src/controllers
Modules containing controllers for your resources, such as user.getAll or post.update. Each controller file is supposed to store controllers for one API resource only.

### /src/errors
Modules containing functions that return Error objects, which should contain a message and a HTTP status, and optionally an exception and a redirect. The handleError middleware sents the response status to the error's status and sends it's data and redirect. In order to throw one of this errors, you can make a call as it follows from inside any middleware:

```javascript
next(routeNotFoundError());
```

Every file in this folder is autoloaded by src/errors/index.js, so that you may use it like this:
```javascript
require('../errors'); //The errors folder path
...
//The function exported by userNotFound.js is set as userNotFound() in the errors object.
next(errors.userNotFound()); 
```

### /src/middlewares
Modules exporting middleware functions to be added to the expressjs request pipeline when necessary. This functions must take (req,res,next) or (err,req,res,next) as arguments.

### /src/models
Modules containing the definition of the Sequelize Models. This modules should export functions which take (sequelize : Sequelize,DataTypes) as arguments and return a Sequelize Model. You may set this model's associate attribute as a function that takes an object containig the database's models as an argument to define the model's associations.

Example:
```javascript
module.exports = (sequelize, DataTypes) => {
    //Definition
    const Post = sequelize.define('Post',{
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    //Associations
    Post.associate = (models) => {
        Post.belongsTo(models.User,{
            as: "author",
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Post;
};

```

You should require the models folder as an object for your database. This object will contain a sequelize instance and your models, as index.js takes care of autoloading all of them.

Example:
```javascript
const db = require('../models');
...
const posts = db.Post;
const allPosts = await posts.findAll();
```

When necessary, you may access your sequelize instance at db.models.

Example:
```javascript
const db = require('../models');
db.sequelize.sync();
```

### /src/routes
Modules defining your API routes and defining each route's associated controller.
It is recommended that a router may contain exclusively routes associated to one resource only, using only this resource's controllers.

Example (users.js):
```javascript
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');

router.get('/users', controllers.getAll);

router.post('/users', controllers.create);

router.get('/users/:id', controllers.getById);

router.put('/users/:id', controllers.update);

router.delete('/users/:id', controllers.delete);

router.get('/users/:id/posts', controllers.getAllPostsByUserId);

router.post('/users/:id/posts', controllers.createPost);

module.exports = router;
```

All of the routers are autoloaded by a router defined on index.js, so that you may use it like this:

```javascript
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(routes);
```

### src/app.js
The application's express instance setup, requiring and using the middlewares, routes and plugins.
