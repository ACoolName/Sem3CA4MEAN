'use strict';

angular.module('meanApp.viewCategories', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'app/viewCategory/categories.html',
            controller: 'categoriesCtrl'
        });
    }])

    .controller('categoriesCtrl',['$scope','InfoFactory','InfoService', function($scope,InfoFactory,InfoService) {
        //to do here
    }]);