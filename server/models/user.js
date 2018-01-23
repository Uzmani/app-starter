const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our User Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // Hash (encrypt) our password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Overwrite plain text password with encrypted password
      user.password = hash;
      console.log('user with hashed password is: ', user.password);
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
