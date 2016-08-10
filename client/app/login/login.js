// create an angular module for the log in template         
angular.module('hotspot.login', [])
  // create a config function to set state/routes and controller
 .config(function($stateProvider){
  $stateProvider
    // set state
    .state('login', {
      // url path in browser
      url: '/login',
      // file path to login template
      templateUrl: 'app/login/login.html',
      // create controller for logon template
      controller: function($scope, $window, $location, $http){
        // assign a function to the controller scope for use on client side
        $scope.logIn = function(){
          // set the user object containing client side input to a variable 
          var user =  $scope.user;
          // make a post request to  the server contaning the user input object
          $http({
            method: 'post',
            url: '/login',
            data: user 
          })
          // in response to youre http requst the server sends back a json token
          // this promise contains the json token injected in it's callback param
          .then(function(resp){
            // access Local Storage object on browser window and set token
            $window.localStorage.setItem('hotspot.login', resp.data.token)
            // redirect to mapview template
            $location.path('/mapview')
          })
          // 
          .catch(function(err){
            console.error(err);

          }) 
          // maybe add a dot fail function here
          }
        },
       controllerAs: 'loginCtrl'
    })
  }) 