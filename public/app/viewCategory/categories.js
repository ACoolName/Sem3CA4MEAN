'use strict';

angular.module('meanApp.viewCategories', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'app/viewCategory/categories.html',
            controller: 'categoriesCtrl'
        });
    }])

    .controller('categoriesCtrl',['$scope','WikiFactory', function($scope,WikiFactory) {
        WikiFactory.getCategories().success(function(cat){
            $scope.categories=cat;
        })
    }]);