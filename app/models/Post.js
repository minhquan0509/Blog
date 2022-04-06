const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    sanitizedHtml:  String,
    authorID: String
})

module.exports =  mongoose.model('Post',postSchema);