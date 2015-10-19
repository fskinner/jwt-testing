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
app.get('/setup', (req, res) => {

  // create a sample user
  const sampleUser = new User({
    name: 'John Tester',
    password: 'passwordz',
    admin: true
  });

  // save the sample user
  sampleUser.save((err) => {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// API ROUTES -------------------
// get an instance of the router for api routes
const apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', (req, res) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
