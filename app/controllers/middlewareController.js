const jwt = require('jsonwebtoken');
const Post = require('../models/Post'); 
const middlewareController = {

    //verify token
    verifyToken: (req, res, next) =>{
        // const token = req.headers.token;
        const token = req.cookies.token;
        if(token){
            // const accessToken = token.split(' ')[1];
            const accessToken = token;
            jwt.verify(accessToken, process.env.JWT_SECRET_KEY,(err, user)=>{
                if(err){
                    return res.status(403).json('Token is not valid');
                }
                req.user = user;
                next();
            })
        }
        else{
            // res.status(401).json('Not authenticated yet');
            res.redirect('/auth/login');
        }
    },

    verifyTokenAndAdmin: (req, res, next) =>{
        middlewareController.verifyToken(req, res, ()=>{
            if(req.user.admin){
                next();
            } else{
                res.status(403).json('You are not allow to do that action');
            }
        })
    },

    verifyUserPost: async (req, res, next) =>{
        if(!req.cookies.token) return res.redirect('/auth/login');
        const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        if(!user) {
            return res.status(403).json('You are not authenticated');
            // res.redirect('home');
        }
        
        const post = await Post.findOne({_id: req.params.postID, authorID: user.id}).exec();
        console.log(post);
        if(!post){
            return res.status(404).json('Not your post! Cannot modify!');
            // res.redirect('home');
        }
        next();
    }
}

module.exports = middlewareController