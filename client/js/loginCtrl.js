'use strict';

var EPAM = require('./main');

EPAM.controller('LogInCtrl', function ($scope, $state, user, logger) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.userLogin = function (email, password) {
      user.login({
        email: email,
        password: password,
      })
      .then(handleSuccess)
      .catch(handleError);
    };

    function handleSuccess() {
      $state.go('home');
    }

    function handleError(error) {
      $scope.Error = error.data.message;
      $scope.password = '';
      logger.createLogMessage('error', 'Failed to log in!');
    }
  });
