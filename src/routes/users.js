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
