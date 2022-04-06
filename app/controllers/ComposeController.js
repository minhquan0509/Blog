const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const { marked } = require('marked');
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

class ComposeController{
    index(req, res){
        res.render('compose');
    }
    create(req, res){
        const getUser = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        const userID = getUser.id;
        const post = new Post({
            title : req.body.postTitle,
            content : req.body.postContent,
            createdAt: new Date(),
            sanitizedHtml: dompurify.sanitize(marked.parse(req.body.postContent)),
            authorID: userID
        });
        console.log(req.body, userID);
        post.save(function(err){
            if(!err) res.redirect('../');
        });
    }

    render(req, res){
        Post.findById(req.params.postID,function(err, post){
            if(!err) res.render('edit', {
                post: post
            })
        })
    }

    edit(req, res){
        Post.updateOne({_id: req.params.postID},{
            title : req.body.postTitle,
            content : req.body.postContent
        },function(err, result){
            if(!err)
            res.redirect('/');
        })
    }

    delete(req, res){
        Post.deleteOne({_id: req.params.postID}, function(err, result){
            if(!err)
            res.redirect('/');
        })
    }
}

module.exports = new ComposeController;