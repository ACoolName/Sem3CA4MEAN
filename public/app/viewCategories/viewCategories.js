'use strict';

angular.module('meanApp.viewCategories', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'app/viewCategories/viewCategories.html',
            controller: 'categoriesCtrl'
        });
    }])

    .controller('categoriesCtrl',['$scope','WikiFactory', function($scope,WikiFactory) {
        $scope.oneAtATime = true;

        var str = "0123456789abcdefghijklmnopqrstuvwxyz";

        $scope.navigationBarStringTOArrayWIthToManyLettersThatAreUpperCased = str.split("");

        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            var offset = ($scope.currentPage - 1) * $scope.maxSize;
            $scope.currentCategories= $scope.categories.slice(offset, offset + $scope.maxSize);
        };

        $scope.maxSize = 5;


        WikiFactory.getCategories().success(function(cat){
            $scope.totalItems = cat.length;
            $scope.categories=cat;
            $scope.currentCategories= cat.slice(0, $scope.maxSize);
        })
    }]);