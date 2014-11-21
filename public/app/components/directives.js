'use strict';

/* Directives */

angular.module('meanApp.directives', [])
    .directive('wikis', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:  '<ul>'+
            '<p style="color: red">{{error}}</p>'+
            '<li ng-repeat="wiki in wikis | filter:searchRes:strict"> '+
            '<div><span popover="{{wiki.abstract}}"  popover-trigger="mouseenter" popover-placement="right" popover-popup-delay="500"><a href="#/wiki/{{wiki.title}}">{{wiki.title}}</a></span></div>'+
            '</li>'+
            '</ul>'
        };
    })
    .directive('wikiDetailsTitle', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:   '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">Title: </label>'+
                        '<div class="col-sm-10">'+
                        '<label>{{wikiDetails.title}}</label>'+
                        '</div>'+
                        '</div>'
        };
    })

    .directive('wikiDetailsURL', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:   '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">URL: </label>'+
                        '<div class="col-sm-10">'+
                        '<label><a href="{{wikiDetails.url}}">{{wikiDetails.url}}</a></label>' +
                        '</div>'+
                        '</div>'
        };
    })

    .directive('wikiDetailsAbstract', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:   '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">Abstract: </label>'+
                        '<div class="col-sm-10">'+
                        '<label>{{wikiDetails.abstract}}</label>' +
                        '</div>'+
                        '</div>'
        };
    })

    .directive('wikiDetailsCategories', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:   '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">Categories: </label>'+
                        '<div class="col-sm-10">'+
                        '<ul ng-repeat="dataDetails in wikiDetails.categories">'+
                        '<li>'+
                        '<a href="#/categories/{{dataDetails}}">{{dataDetails}}</a>'+
                        '</li>'+
                        '</ul>' +
                        '</div>'+
                        '</div>'
        };
    })

    .directive('wikiDetailsLinks', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:   '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">Links: </label>'+
                        '<div class="col-sm-10">'+
                        '<ul ng-repeat="dataLink in wikiDetails.links">'+
                        '<li>'+
                        '<a href="" ng-click="linkClick(dataLink, wikiDetails.title)"> {{dataLink}}</a>'+
                        '</li>'+
                        '</ul>' +
                        '</div>'+
                        '</div>'
        };
    })

    .directive('wikiDetailsHeading', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            template:   '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">Headings: </label>'+
                        '<div class="col-sm-10">'+
                        '<ul ng-repeat="dataHeadings in wikiDetails.headings">'+
                        '<li>'+
                        '{{dataHeadings.heading}}'+
                        '</li>'+
                        '</ul>' +
                        '</div>'+
                        '</div>'
        };
    })
    .directive('categoriesWiki',function(){
        return{
            restrict:'AE',
            replace:'true',
            template:'<div class="col-sm-10">'+
                '<label>Wikis in category: <label style="color: lightskyblue"> {{cate}}</label> </label>'+
            '<ul ng-repeat="categ in catWithWiki">'+
            '<li>'+
            '<div><span popover="{{categ.abstract}}"  popover-trigger="mouseenter" popover-placement="right" popover-popup-delay="3000">{{categ.title}}</span></div>'+
            '</li>'+
            '</ul>'
        }
    })
