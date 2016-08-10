angular.module('hotspot', ['ui.router', 'hotspot.login', 'hotspot.signup', 'hotspot.mapview'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login')

    $stateProvider
      .state('index', {
        url: '/index',
        templateUrl: 'index.html',
        userService: function(){

        },
        controller: function($scope){

        }, 

        controllerAs: 'hotController'
      })


      // .then promises
    
  });

