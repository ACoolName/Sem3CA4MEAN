'use strict';

angular.module('meanApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wiki', {
            templateUrl: 'app/viewHome/home.html',
            controller: 'wikiCtrl'
        });
    }])

    .controller('wikiCtrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'api/wiki'
        }).
            success(function (data, status, headers, config) {
                $scope.wikis = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
        $scope.doSearch = function(){
            $scope.searchRes="";
            $scope.searchRes = $scope.searchCriteria;
        }
    });