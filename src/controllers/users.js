const db = require('../models');
const errors = require('../errors');

exports.getAll = async (req,res,next) => {
    try {
        const users = db.User;
        const allUsers = await users.findAll();
        await res.json(allUsers);
    }
    catch (ex) {
        return next(errors.database(ex));
    }
}

exports.getById = async (req,res,next) => {
    try{
        const users = db.User; 
        const foundUser = await users.findByPk(req.params.id);

        if (!foundUser) return next(errors.userNotFound());

        await res.json(foundUser);
    }
    catch (ex) {
        return next(errors.database(ex));
    }
}

exports.create = async (req,res,next) => {
    try{
        const users = db.User;
        const newUser = await users.create(req.body);
        await res.json(newUser);
    }
    catch (ex) {
        return next(errors.database(ex));
    }
}

exports.update = async (req,res,next) => {
    try{
        const users = db.User;
        const foundUser = await users.findByPk(req.params.id);
        
        if (!foundUser) return next(errors.userNotFound());

        const updatedUser = await foundUser.update(req.body);
        
        await res.json(updatedUser);       
    }
    catch (ex) {
        return next(errors.database(ex));
    }
}

exports.delete = async (req,res,next) => {
    try{
        const users = db.User;
        const foundUser = await users.findByPk(req.params.id);

        if (!foundUser) return next(errors.userNotFound());
        
        await foundUser.destroy();
        await res.status(204);
        await res.end(); 
    }
    catch (ex) {
        await next(errors.database(ex));
    }
}

exports.getAllPostsByUserId = async (req, res, next) => {
    try{
        const users = db.User;
        const foundUser = await users.findByPk(req.params.id);

        if (!foundUser) return next(errors.userNotFound());

        const foundPosts = await foundUser.getPosts();
        await res.json(foundPosts);
    }
    catch (ex) {
        return next(errors.database(ex));
    }
}

exports.createPost = async (req,res,next) => {
    try{
        const users = db.User; 
        const foundUser = await users.findByPk(req.params.id);

        if (!foundUser) return next(errors.userNotFound());

        const posts = db.Post;
        const newPost = await posts.create({...req.body, authorId: req.params.id});
        await res.json(newPost);
    }
    catch (ex) {
        return next(errors.database(ex));
    }
}
