'use strict';

var EPAM = require('./main');

EPAM.run(function ($rootScope, $http, $state, user) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {

        if (!user.isAuthenticated()) {
          stopStateChange();
          user.authenticateUser()
              .then(continueStateChange);
        }

        function stopStateChange() {
          event.preventDefault();
        }

        function continueStateChange() {
          $state.go(toState);
        }

      });
  });
