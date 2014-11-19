'use strict';

/* Directives */

angular.module('meanApp.directives', [])
    .directive('angularLinks', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template: '<ul style="list-style-type: none">' +
                '<li><a href="http://www.sitepoint.com/practical-guide-angularjs-directives/">A practical Guide</a></li>' +
                '<li><a href="http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-i-the-fundamentals">Creating Custom Directives</a></li>' +
                '</ul>'
        };
    });


angular.module('meanApp.directives', []).
    directive('wikis', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:  '<ul>'+
            '<p style="color: red">{{error}}</p>'+
            '<li ng-repeat="wiki in wikis | filter:searchCriteria:strict"><a href="#">{{wiki.title}}</a></li>'+
            '</ul>'
        };
    });

angular.module('meanApp.directives', []).
    directive('wikiDetailsTable', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:  '<ul>'+
            '<p style="color: red">{{error}}</p>'+
            '<li ng-repeat="wiki in wikis | filter:searchCriteria:strict"><a href="#">{{wiki.title}}</a></li>'+
            '</ul>'
        };
    });