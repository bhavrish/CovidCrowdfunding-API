'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LocalBusinessSchema = new Schema({
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
    required: 'Please enter the name of your business'
  },
  description: {
    type: String,
    required: 'Please enter a description of your business'
  },
  targetGoal: {
    type: Number,
    required: 'Please enter the target money goal for your business'
  },
  moneySoFar: {
    type: Number,
    default: 0
  },
  contactPhoneNumber: {
    type: Number
  },
  contactEmail: {
    type: String
  }
});

module.exports = mongoose.model('LocalBusinesses', LocalBusinessSchema);