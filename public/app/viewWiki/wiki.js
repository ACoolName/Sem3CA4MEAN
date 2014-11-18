'use strict';

angular.module('meanApp.viewWiki', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wiki', {
            templateUrl: 'app/viewWiki/wiki.html',
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