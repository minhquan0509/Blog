const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) =>{
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    } else {
        cb(new Error('Not an image'), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


const userController = {
    uploadUserPhoto: upload.single('photo'),
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
        console.log(req.file);
        console.log(req.body);
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
