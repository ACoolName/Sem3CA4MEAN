'use strict';

angular.module('meanApp.viewCategoriesWiki', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories/:id', {
            templateUrl: 'app/viewCategoryWiki/categoriesWiki.html',
            controller: 'categoriesWikiCtrl'
        });
    }])

    .controller('categoriesWikiCtrl',['$scope','$routeParams','WikiFactory',function($scope,$routeParams,WikiFactory){
        console.log($routeParams);
        $scope.cate = $routeParams.id;
        WikiFactory.getWikisInCategory($scope.cate).success(function(data){
            $scope.catWithWiki = data;
            console.log($scope.catWithWiki)
        })
    }]);