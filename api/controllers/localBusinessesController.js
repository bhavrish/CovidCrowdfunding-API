'use strict';

var mongoose = require('mongoose'),
  Business = mongoose.model('LocalBusinesses');



exports.list_all_businesses = function(req, res) {
  Business.find({}, '-username -password', function(err, business) {
    if (err)
      res.send(err);
    res.json(business);
  });
};


exports.create_a_business = function(req, res) {
  var new_business = new Business(req.body);
  new_business.save(function(err, business) {
    if (err)
      res.send(err);
    res.json(business);
  });
};

exports.login_a_business = function(req, res) {
  Business.findOne({username: req.body.username, password: req.body.password}, function(err, business) {
    if (err)
      res.send(err);
    res.json(business);
  });
};


exports.read_a_business = function(req, res) {
  Business.findById(req.params.businessId, function(err, business) {
    if (err)
      res.send(err);
    res.json(business);
  });
};


exports.update_a_business = function(req, res) {
  Business.findOneAndUpdate({_id: req.params.businessId}, req.body, {new: true}, function(err, business) {
    if (err)
      res.send(err);
    res.json(business);
  });
};


exports.delete_a_business = function(req, res) {
  Business.remove({
    _id: req.params.businessId
  }, function(err, business) {
    if (err)
      res.send(err);
    res.json({ message: 'Business successfully deleted' });
  });
};
