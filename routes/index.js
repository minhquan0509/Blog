const composeRouter = require('./compose');
const siteRouter = require('./site');
const postRouter = require('./post');
const authRouter = require('./auth');
function route(app){
    
    app.use('/auth',authRouter);
    app.use('/posts', postRouter)
    app.use('/compose', composeRouter);
    app.use('/', siteRouter); 
}

module.exports = route;
