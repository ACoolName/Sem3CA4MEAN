'use strict';

angular.module('meanApp.viewWiki', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wiki', {
            templateUrl: 'app/viewWiki/wiki.html',
            controller: 'wikiCtrl'
        });
    }])

    .controller('wikiCtrl', ['$scope', 'WikiFactory', function ($scope, WikiFactory) {
        $scope.doSearch = function(){
            var searchTerm = $scope.searchTerm;

            WikiFactory.findWiki(searchTerm)
                .success(function (wikis) {
                    $scope.wikis = wikis;
                });
        }
    }]);