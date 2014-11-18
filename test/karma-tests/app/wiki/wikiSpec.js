'use strict';

describe('meanApp.viewWiki module', function () {
    var scope, httpBackendMock, ctrl, wikiFactory;
    beforeEach(module('meanApp.viewWiki'));
    beforeEach(module('meanApp.factories'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller, _WikiFactory_) {
        httpBackendMock = $httpBackend;
        wikiFactory = _WikiFactory_;
        scope = $rootScope.$new();
        ctrl = $controller('wikiCtrl', {$scope: scope});
    }));

    describe('wikiCtrl controller functionality test in full isolation', function () {

        it('should exist', function () {
            expect(ctrl).toBeDefined();
        });

        it('should recieve the title and abstract', inject(function ($controller) {
            var fakeWikiList = [
                {title: "Fake One", abstract: "A fake abstract"},
                {title: "Fake Two", abstract: "A sentence"}
            ];
            spyOn(wikiFactory, 'findWiki').andReturn({
                success: function (callback) {
                    callback(fakeWikiList)
                }
            });
            scope.searchTerm = "Fake";

            runs(function () {
                scope.doSearch();
            });
            waitsFor(function () {
                return scope.wikis;
            });
            runs(function () {
                expect(wikiFactory.findWiki).toHaveBeenCalledWith("Fake");
                expect(scope.wikis.length).toEqual(2);
            });
        }))
    });
});


//            var dummy={
//                title: "An American in Paris",
//                url:"http://en.wikipedia.org/wiki/An_American_in_Paris",
//                abstract:"An American in Paris is a symphonic composition by American composer George Gershwin which debuted in 1928. Inspired by Gershwin's time in Paris, it is in the form of an extended tone poem evoking the sights and energy of the French capital in the 1920s.",
//                categories:["Symphonic poems"],
//                headings:[
//                {
//                    heading:"Compositions by George Gershwin",
//                    position: "1"
//                },
//                    {
//                        heading:"Symphonic poems",
//                        position:"2"
//                    }],
//                links:["http://en.wikipedia.org/wiki/1920s","http://en.wikipedia.org/wiki/Gene_Kelly"]
//            };