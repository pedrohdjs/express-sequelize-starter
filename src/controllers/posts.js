const db = require('../models');
const errors = require('../errors');

exports.getAll = async (req,res,next) => {
    try {
        const posts = db.Post;
        const allPosts = await posts.findAll();
        await res.json(allPosts);
    }
    catch (ex) {
        return next(errors.database(ex));
    }

}

exports.getById = async (req,res,next) => {
    try{
        const posts = db.Post;
        const foundPost = await posts.findByPk(req.params.id);

        if (!foundPost) return next(errors.postNotFound());

        await res.json(foundPost);
    }
    catch (ex) {
        return next(errors.database(ex));
    }

}

exports.create = async (req,res,next) => {
    try{
        const users = db.User; 
        const foundUser = await users.findByPk(req.body.authorId);

        if (!foundUser) return next(errors.userNotFound());

        const posts = db.Post;
        const newPost = await posts.create(req.body);
        await res.json(newPost);
    }
    catch (ex) {
        return next(errors.database(ex));
    }
}

exports.update = async (req,res,next) => {
    try{
        const posts = db.Post;
        const foundPost = await posts.findByPk(req.params.id);

        if (!foundPost) return next(errors.postNotFound());

        const updatedPost = await foundPost.update(req.body);
        
        await res.json(updatedPost);       
    }
    catch (ex) {
        return next(errors.database(ex));
    }

}

exports.delete = async (req,res,next) => {
    try{
        const posts = db.Post;
        const foundPost = await posts.findByPk(req.params.id);

        if (!foundPost) return next(errors.postNotFound());
        
        await foundPost.destroy();
        await res.status(204);
        await res.end(); 
    }
    catch (ex) {
        await next(errors.database());
    }
}