angular.module('hotspot.mapview', [])

  .config(function($stateProvider){
    $stateProvider

      .state('mapview', {
        url: '/mapview',
        templateUrl: 'app/mapview/mapview.html',
        controller: function($scope, $location, $window){
          $scope.signOut = function(){
            $window.localStorage.clear();
            $location.path('/signup');
          }
        },
        controllerAs: 'mapCtrl'

      })
  })