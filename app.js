const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const route = require('./routes');

const db = require('./config/db');

db.connect();

const desc = '';
const about = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const contact = 'Suspendisse luctus molestie diam vel aliquam. Etiam tristique lectus suscipit nibh mollis, sit amet ultricies metus tempor. Nunc auctor aliquet ante ut lacinia. Mauris a urna id libero volutpat consequat. Curabitur porta at urna non egestas. Cras at laoreet ipsum, consequat vulputate dolor. Etiam maximus est nec quam ornare, non ultrices mauris venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin condimentum et nulla eu sollicitudin.';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

route(app);

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has started');
})