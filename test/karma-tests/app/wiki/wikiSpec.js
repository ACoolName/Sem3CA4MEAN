'use strict';

describe('meanApp.viewWiki module', function () {
    var scope, httpBackendMock, ctrl, wikiFactory;
    beforeEach(module('meanApp.viewWiki'));
    beforeEach(module('meanApp.factories'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller, _WikiFactory_) {
        httpBackendMock = $httpBackend;
        wikiFactory = _WikiFactory_;
        scope = $rootScope.$new();
        ctrl = $controller('wikiFindCtrl', {$scope: scope});
    }));

    describe('wikiFindCtrl controller functionality test in full isolation', function () {

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