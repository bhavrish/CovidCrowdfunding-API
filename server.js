var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Business = require('./api/models/localBusinessesModel'),
  User = require('./api/models/usersModel'),
  bodyParser = require('body-parser'),
  routes = require('./api/routes/routes');
  

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Businessdb'); 

const db = "mongodb+srv://bhaveshshah:bhaveshshah@cluster0.hosyo.mongodb.net/covidcrowdfunding?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app); //register the routes


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('Covid Crowdfunding RESTful API server started on: ' + port);
