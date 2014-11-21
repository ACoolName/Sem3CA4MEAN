'use strict';

angular.module('meanApp.viewWikiDetails', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wiki/:title',{
            templateUrl:'app/viewWikiDetails/wikiDetails.html',
            controller: 'wikiGetCtrl'
        });
    }])
    .controller('wikiGetCtrl',['$scope','$routeParams','WikiFactory',function($scope,$routeParams,WikiFactory){
        $scope.wikiTitle= $routeParams.title;
            WikiFactory.getWiki($scope.wikiTitle).success(function(wikis){
                $scope.wikiDetails=wikis;
            });
        $scope.linkClick = function (url) {
            var title = url.split("/").pop().replace('_', ' ');
            WikiFactory.getWiki(title)
                .success(function (wiki) {
                    window.location = "#/wiki/" + title;
                })
                .error(function () {
                    window.location = url;
                });
        }
    }]);