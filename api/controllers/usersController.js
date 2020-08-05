'use strict';

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/usersModel");


exports.create_a_user = function(req, res) {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) { // user is array, so return error if there's multiple users with same username
        return res.status(409).json({
          message: "Username exists"
        });
      } 
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } 
          else {
            const newUser = new User({
              username: req.body.username,
              password: hash,
              name: req.body.name,
            });
            newUser.save(function(err, user) {
              if (err)
                res.send(err);
              res.json(user);
            });
          }
        });
      }
    });
};

exports.login_a_user = function(req, res) {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) { // if user does not exist
        return res.status(401).json({
          message: "Username does not exist"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => { // bcrypt password before comparing
        if (err) {
          return res.status(401).json({
            message: "Authorization failed"
          });
        }
        if (result) {
          const token = jwt.sign( // create jwt token
            {
              username: user[0].username,
              userId: user[0]._id
            },
            "asdhfoaiuf983y23rhiahilfhlf", // secret jwt key
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Authorization successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Username and password do not match"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  User.findOne({ _id: req.params.userId })
    .then(user => {
      if (user.length < 1) { // if user does not exist
        return res.status(401).json({
          message: "Username does not exist"
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => { // hash new password
        if (err) {
          return res.status(500).json({
            error: err
          });
        } 
        else {
          User.findOneAndUpdate({ _id: req.params.userId }, { password: hash })
              .then(() => res.status(202).json("Password changed"))
              .catch(err => res.status(500).json(err))
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.delete_a_user = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

exports.list_all_users = function(req, res) {
  User.find({}, '-username -password', function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};