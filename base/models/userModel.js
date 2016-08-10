// reuire mongoose orm bcrypt for encription and Q for Async promises and set salt
var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q'),
    SALT_WORK_FACTOR = 10;

//create user model
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
      type: String,
      require: true,
      uniq: true
  },
  email: {
      type: String,
      require: true,
      uniq: true
  }
  ,
  password: {
      type: String,
      require: true
  },
  salt: String
})

  // read about this defer and console.log(defer())
  UserSchema.methods.comparePasswords = function(userpassword){
      var defer = Q.defer();
      var savedpassword = this.password;
      console.log('msg1', savedpassword);
      console.log('msg2', userpassword)
      console.log('msg3', defer);
      bcrypt.compare(userpassword, savedpassword, function(err, match){
        console.log('compairing passwords!!', match)
          if (err) {
              defer.reject(err);
          }else{
              defer.resolve(match);
              console.log('match$$$$match', match)
          }
      })
      return defer.promise
  };

// testing method
  // UserSchema.methods.comparePasswords()

  UserSchema.pre('save', function(next){
    // get the current user or instance of the user schema
    var user = this;
    console.log('I am this', user);
    // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }
  // create the salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    // handle error
    if (err) {return next(err)}
    // hash the password and the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
        // handle error
        if (err) {return next(err)}
        // over ride the user password with the hash and add the salt to the salt property.
        user.password = hash;
        user.salt = salt;
        next();
    });
  });   
});

var User = mongoose.model('users', UserSchema);

module.exports = User;