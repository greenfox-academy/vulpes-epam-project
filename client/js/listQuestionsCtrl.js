'use strict';

var EPAM = require('./main');

EPAM.controller('ListQuestionsCtrl', function ($scope, $state, questionsList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    }

    $scope.getQuestions = function () {
      return questionsList.getAllQuestions();
    };

    questionsList.fetchAllQuestions();
  });
