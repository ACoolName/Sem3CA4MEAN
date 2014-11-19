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
            })
    }]);