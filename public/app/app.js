'use strict';

// Declare app level module which depends on views, and components
angular.module('meanApp', [
    'ngRoute',
    'meanApp.controllers',
    'meanApp.directives',
    'meanApp.services',
    'meanApp.factories',
    'meanApp.filters',
    'meanApp.view1',
    'meanApp.view2',
    'meanApp.view3'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
