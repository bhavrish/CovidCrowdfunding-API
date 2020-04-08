'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Please enter username'
  },
  password: {
    type: String,
    required: 'Please enter password'
  },
  name: {
    type: String,
    required: 'Please enter your name'
  }
});

module.exports = mongoose.model('Users', UserSchema);