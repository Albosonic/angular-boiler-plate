var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./base/models/userModel.js');
var jwt = require('jwt-simple');
var Q = require('q');
var morgan = require('morgan');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/hotspot');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
// app.set('view engine', 'ejs');

var User = require('./base/models/userModel.js');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/client'));

// set the home page route
app.get('/', function(req, res) {

  // ejs render automatically looks in the views folder
  // res.render('index');
});



app.post('/login', function(req, res, next){
  // save client side post request body to a var
  var user = req.body;
  // save client side username and passowrd to vvariables 
  var username = req.body.username;
  var password = req.body.password;
  // bind the mongoose findOne function with Q.promise
  var findOne = Q.nbind(User.findOne, User);
  // query the database for 
  User.findOne({ username: username })
    // .then promise contains findOne mongoose data injected into it's call back param
    .then(function(userCurrent){
      // if user is not null aka exists
      if(userCurrent){
        // compare password of the current user to the password associated with the findOne function
        return userCurrent.comparePasswords(password)
          // this promise gives back true or false as it's callback input param from compare the function
          .then(function(foundUser){
              // check if value of foundUser is true or false
              if(foundUser){
                // use jwt library to encode userCurrent + a 'secret' into a token for the browser 
                var token = jwt.encode(userCurrent, 'secret');
                // respond with token in json format to client side framework
                res.json({ token: token });
              }else{
                // use express function next to throw errors if user if passwords do not match
                next(new Error('foundUser promise is null'));
              }
          })
      }else{
        // throw error if findOne query returns null after promise
        next(new Error('you fucked up bra!!'));
      }
    })
    
    // .fail(function(error){
    //   next(error);
    // })


  });

// hotspot lets you know how many people are there through user reporting


        // return userCurrent.comparePasswords(password)

        //   .then(function(foundUser){

        //     console.log('foundUser', foundUser);

        //     if(foundUser){
        //       var token = jwt.encode(userCurrent, 'secret');
        //       res.json({ token: token });
        //     }else{
        //       next(new Error('user does not exist'));
        //     }
        //   })

// data is persisiing to data base
app.post('/signup', function(req, res, next){
  // save client data to variables
  var user = req.body;
  var username = req.body.username;
  var password = req.body.password;
  
  // promisify the findOne functioin
  var findOne = Q.nbind(User.findOne, User);

  // check if username already exists
  User.findOne({username: username})
  // use promise to grab results from findOne
  .then(function(resp){
    // check if response is truthy
    if(resp){
      // if so kick errors using next
      next(new Error('wtf bra!!!!!!!!!!$$$$$$'));
    }else{
      // duh resp doesn't exist so no return from the promise
      console.log('&&&&&&&&&&&', user);
      // if . then resp if falsy bind mongoose create
      var create = Q.nbind(User.create, User);    
      // return newly created user to promise  callback
      return create(user, function(err, newUser){
        console.log('database persistent user', newUser);
      })
    }
  })
  .then(function(newUser){
    // .then create token for newUser
    var token = jwt.encode(newUser, 'secret');
    // respond to the client side framework with token object
    res.json({token: token});
  }) 
  // .fail(function(error){
  //   next(error);
  // });

})
  

app.listen(port, function() {
    console.log('I\'s Alive:' + port);
});
