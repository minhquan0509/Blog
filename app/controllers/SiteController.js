const Post = require('../models/Post');

class SiteController{
    home(req, res){
        Post.find({}, function(err, posts){
            if(!err) 
            res.render('home', {
                posts: posts
            });
        })
    }

    contact(req, res){
        res.render('contact');
    }

    about(req, res){
        res.render('about');
    }
}

module.exports = new SiteController;