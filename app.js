require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const route = require('./routes');

const db = require('./config/db');
db.connect();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(methodOverride('_method'));
route(app);

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has started');
})