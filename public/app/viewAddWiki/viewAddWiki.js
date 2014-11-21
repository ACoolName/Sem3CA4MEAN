'use strict';

angular.module('meanApp.viewAddWiki', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addwiki', {
            templateUrl: 'app/viewAddWiki/viewAddWiki.html',
            controller: 'wikiAddCtrl'
        });
    }])
    .controller('wikiAddCtrl', ['$scope', '$routeParams', 'WikiFactory', function ($scope, $routeParams, WikiFactory) {
        function wikiObject() {
            return {
                title: "",
                abstract: "",
                url: "",
                categories: [],
                headings: [],
                links: []
            };
        }

        var newPostion = 1;
        $scope.wiki = new wikiObject();

        $scope.addWiki2 = function () {
            console.log($scope.wiki);
        };
        $scope.addCategory = function () {
            if ($scope.wiki.categories.indexOf($scope.category) == -1) {
                $scope.wiki.categories.push($scope.category);
            }
            $scope.category = "";
        };
        $scope.addLink = function () {
            if ($scope.wiki.links.indexOf($scope.link) == -1) {
                $scope.wiki.links.push($scope.link);
            }
            $scope.link = "";
        };
        $scope.addHeading = function () {
            if ($scope.wiki.headings.indexOf($scope.heading) == -1) {
                $scope.wiki.headings.push({ heading: $scope.heading, position: newPostion++});
            }
            $scope.heading = "";
        };
        $scope.addWiki = function () {
            WikiFactory.addWiki($scope.wiki)
                .success(function () {
                    $scope.success = true;
                })
        };

        $scope.reset = function () {
            $scope.wiki = new wikiObject();
            $scope.category = "";
            $scope.heading = "";
            $scope.link = "";
            $scope.title = "";
            $scope.abstract = "";
            $scope.url = "";
        };

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function (open) {
        };

        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    }]);