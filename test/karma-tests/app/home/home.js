'use strict';

describe('meanApp.home module', function () {
    var scope, httpBackendMock, ctrl;
    beforeEach(module('meanApp.view1'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackendMock = $httpBackend;
        scope = $rootScope.$new();
        ctrl = $controller('wikiCtrl', {$scope: scope});
    }));

    describe('wikiCtrl controller functionality test', function () {

        it('should exist', function () {
            expect(ctrl).toBeDefined();
        });

        it('should receive an object', inject(function ($controller) {
            var dummy={
                title: "An American in Paris",
                url:"http://en.wikipedia.org/wiki/An_American_in_Paris",
                abstract:"An American in Paris is a symphonic composition by American composer George Gershwin which debuted in 1928. Inspired by Gershwin's time in Paris, it is in the form of an extended tone poem evoking the sights and energy of the French capital in the 1920s.",
                categories:["Symphonic poems"],
                headings:[
                {
                    heading:"Compositions by George Gershwin",
                    position: "1"
                },
                    {
                        heading:"Symphonic poems",
                        position:"2"
                    }],
                links:["http://en.wikipedia.org/wiki/1920s","http://en.wikipedia.org/wiki/Gene_Kelly"]
            };
            httpBackendMock.expectGET('api/wiki').respond(dummy);
            httpBackendMock.flush();
            expect(scope.wikis).toEqual(dummy);
        }));

        it('should recieve the title and abstract', inject(function($controller){
            var dummy={
                title:"An American in Paris",
                abstract:"An American in Paris is a symphonic composition by American composer George Gershwin which debuted in 1928. Inspired by Gershwin's time in Paris, it is in the form of an extended tone poem evoking the sights and energy of the French capital in the 1920s.",
            }
            httpBackendMock.expectGET('api/wiki').respond(dummy);
            httpBackendMock.flush();
            expect(scope.wikis).toEqual(dummy);
        }))
    });
});