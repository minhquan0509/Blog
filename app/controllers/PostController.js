const Post = require('../models/Post');
const User = require('../models/User');
class PostController{
    async find(req, res){
        const postID = req.params.postID;
    
        const post = await Post.findOne({_id: postID});
        const user = await User.findOne({_id: post.authorID});
        let authorName;
        if(post && user) {
            if(user.firstName || user.lastName) {
                authorName = `${user.firstName} ${user.lastName}`;
                return res.render('post',{post, authorName});
            } else {
                authorName = user.username;
                return res.render('post',{post, authorName});
            }
        }
    }
}

module.exports = new PostController;