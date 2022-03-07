const composeRouter = require('./compose');
const siteRouter = require('./site');
const postRouter = require('./post');

function route(app){
    
    app.use('/posts', postRouter)
    app.use('/compose', composeRouter);
    
    app.use('/', siteRouter); 
}

module.exports = route;
