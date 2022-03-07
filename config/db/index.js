const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect("mongodb+srv://minkkquan1:taodeobiet1@cluster0.ets8j.mongodb.net/blogDB", {useNewUrlParser: true});
        console.log('Connect successfully');
    }catch(err){
        console.log('Connect failed!');
    }
}
module.exports = {
    connect
}