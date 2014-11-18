'use strict';

angular.module('meanApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'app/viewCategory/categories.html',
            controller: 'catCtrl'
        });
    }])

    .controller('catCtrl',['$scope','InfoFactory','InfoService', function($scope,InfoFactory,InfoService) {
        //to do here
    }]);