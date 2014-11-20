'use strict';

angular.module('meanApp.viewCategories', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'app/viewCategories/viewCategories.html',
            controller: 'categoriesCtrl'
        });
    }])

    .controller('categoriesCtrl', ['$scope', 'WikiFactory', function ($scope, WikiFactory) {
        var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $scope.navigationBarStringTOArrayWIthToManyLettersThatAreUpperCased = str.split("");
        $scope.navigationBarStringTOArrayWIthToManyLettersThatAreUpperCased.push("ALL");
        $scope.oneAtATime = true;
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        var allCategories;
        var selectedCategories;

        WikiFactory.getCategories().success(function (cat) {
            $scope.totalItems = cat.length;
            allCategories = cat;
            //please don't add spaces infront of the titles next time you create the database scripts, ty
            allCategories.sort();
            selectedCategories = allCategories;
            $scope.currentCategories = selectedCategories.slice(0, $scope.maxSize);
        });


        $scope.nagivationClick = function (searchTerm) {
            if (searchTerm === 'ALL') {
                selectedCategories = allCategories;
            } else {
                selectedCategories = allCategories.filter(function (e) {
                    return e[0].toUpperCase() === searchTerm;
                });
            }
            $scope.currentPage = 1;
            $scope.pageChanged();
        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            var offset = ($scope.currentPage - 1) * $scope.maxSize;
            $scope.currentCategories = selectedCategories.slice(offset, offset + $scope.maxSize);
        };

        $scope.click = function (title) {
            WikiFactory.getWikisInCategory(title).success(function (wikis) {
                $scope.wikis = wikis;
            })
        };
    }]);