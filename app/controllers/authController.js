const User = require('../models/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const authController = {
    registerUser: async(req, res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });
            newUser.save((err, user) =>{
                if(!err) res.redirect('/')
                else res.send(err);
            });
        } catch(err){
            res.send('There was an error');
        }
    },

    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) =>{
        return jwt.sign({
            id: user._id,
            admin: user.admin
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '3h'});
    },

    //LOGIN
    loginUser: async(req, res) =>{
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user) return res.send('User not found');
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            
            if(!isValidPassword) return res.send('Wrong password');
            
            if(isValidPassword && user ) {
                const token = authController.generateAccessToken(user);
                res.cookie('token', token,{
                    httpOnly: true,
                    secure: false,
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*60*60*1000)
                });
                // res.status(200).json({user, token});
                res.redirect('/');
            }
        } catch (error) {
            res.send(error);
        }
    },

    logoutUser : async(req, res) => {
        res.clearCookie('token');
        res.redirect('login');
    }
    
}

module.exports = authController;