const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const userController = {
    getPosts: (req, res)=>{
        Post.find({authorID: req.user.id}, (err, posts)=>{
            if(err) return res.status(404).json(err);
            return res.render('userpost', {posts});
        });
    },

    getInfo: (req, res)=>{
        // console.log(req.user.id);
        User.findOne({_id: req.user.id}, (err, user)=>{
            if(err) return res.status(503).json('There is a problem, try again later');
            if(!user) return res.status(404).json('No user found');
            if(!err && user){
                // console.log(user);
                return res.render('userInfo',{user});
            }
            
        })
    },
    
    updateInfo: (req, res)=>{
        User.updateOne(
            {_id: req.user.id}, 
            {$set:
                {firstName: req.body.firstname,
                lastName: req.body.lastname, 
                address: req.body.address}},
            (err)=>{
                if(err) return res.status(503).json(err);
                else res.redirect('/user/info');
            })
    }
}

module.exports = userController;
