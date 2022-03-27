const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        minlength: 6,
        unique: true
    },
    email:{
        type: String,
        require: true,
        minlength: 8,
        unique: true
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    admin:{
        type: Boolean,
        default: false
    },
    firstName: String,
    lastName: String,
    address: String,

}, 
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);