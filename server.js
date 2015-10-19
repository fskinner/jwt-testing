// =======================
// get the packages we need ============
// =======================
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

import config from './config'; // get our config file
import User from './app/models/user'; // get our mongoose model

const app = express();

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', (req, res) => {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// API ROUTES -------------------
// we'll get

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
