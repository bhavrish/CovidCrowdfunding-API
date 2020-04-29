'use strict';
module.exports = function(app) {
  var localBusinessesList = require('../controllers/localBusinessesController');
  var usersList = require('../controllers/usersController');

  // app.get('/', function(req, res){
  //   console.log("home page");
  // });

  app.route('/').get(localBusinessesList.list_all_businesses);

  // authentication routes
  app.route('/register/business').get(localBusinessesList.create_a_business);
  app.route('/register/user').get(usersList.create_a_user);
  app.route('/register/business').post(localBusinessesList.create_a_business);
  app.route('/register/user').post(usersList.create_a_user);

  app.route('/login/business').post(localBusinessesList.login_a_business);
  app.route('/login/user').post(usersList.login_a_user);



  // Businesses Routes
  app.route('/businesses').get(localBusinessesList.list_all_businesses);
  app.route('/businesses/:businessId').get(localBusinessesList.read_a_business);

  app.route('/businesses/edit/:businessId')
    .put(localBusinessesList.update_a_business)
    .delete(localBusinessesList.delete_a_business);



  // Users Routes
  app.route('/users').get(usersList.list_all_users);
  app.route('/users/:userId').get(usersList.read_a_user);

  app.route('/users/edit/:userId')
    .put(usersList.update_a_user)
    .delete(usersList.delete_a_user);
};
