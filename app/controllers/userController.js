const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const userController = {
    getPosts: (req, res)=>{
        Post.find({authorID: req.user.id}, (err, posts)=>{
            if(err) return res.status(404).json(err);
            return res.render('userpost', {posts});
        });
    }
}

module.exports = userController;
