const Post = require('../models/Post');
class PostController{
    find(req, res){
        const postID = req.params.postID;
    
        Post.findOne({_id: postID}, function(err, result){
            res.render('post',{
                post: result
            });
            // console.log(result);
        })
    }
}

module.exports = new PostController;