'use strict';

/* Factories */

angular.module('meanApp.factories', [])
    .factory('InfoFactory', function () {
        var info = "Hello World from a Factory";
        var getInfo = function getInfo() {
            return info;
        };
        return {
            getInfo: getInfo
        }
    })
    .factory('WikiFactory', function ($http) {
        var getWiki = function (title) {
            return $http({
                method: 'GET',
                url: 'api/wiki/' + title
            })
        };

        var findWiki = function (searchTerm) {
            return $http({
                method: 'GET',
                url: 'api/wikilist/' + searchTerm
            })
        };
        return {
            getWiki: getWiki,
            findWiki: findWiki
        }
    });