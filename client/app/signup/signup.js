angular.module('hotspot.signup', [])

.config(function($stateProvider){
  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: function($http, $location, $window, $scope){
        
        $scope.userSignUp = function(){
          
          var newUser = $scope.user;
          $http({
            method: 'POST',
            url: '/signup',
            data: newUser
          })
          .then(function(resp){
            console.log('response!!!!!!!', resp);

            $window.localStorage.setItem('hotspot', resp.data.token);
            $location.path('/mapview');
          })
          .catch(function(error){
            console.log(error);
          })
          // console.log('$$$$$%%%%%%$$', newUser);
        }
      },
      controllerAs: 'hotspot.signup'
    })
})
          

// $scope.user.username = null;
// $scope.user.password = null;
// $scope.user.email = null;