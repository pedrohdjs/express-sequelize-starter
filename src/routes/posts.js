const express = require('express');
const router = express.Router();
const controllers = require("../controllers/posts.js");

router.get('/posts', controllers.getAll);

router.post('/posts',controllers.create);

router.get('/posts/:id', controllers.getById);

router.put('/posts/:id',controllers.update);

router.delete('/posts/:id', controllers.delete);

module.exports = router;
