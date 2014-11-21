'use strict';

describe('meanApp.viewAddWiki module', function () {
    var scope, httpBackendMock, ctrl, wikiFactory;
    beforeEach(module('meanApp.viewAddWiki'));
    beforeEach(module('meanApp.factories'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller, _WikiFactory_) {
        httpBackendMock = $httpBackend;
        wikiFactory = _WikiFactory_;
        scope = $rootScope.$new();
        ctrl = $controller('wikiAddCtrl', {$scope: scope});
    }));

    describe('wikiAddCtrl controller', function () {
        it('should exist', function () {
            expect(ctrl).toBeDefined();
        });

        it('should return a success promise with the added wiki', function () {
            var title = "Fake wiki title";
            httpBackendMock.expectPOST('api/wiki/').respond(200);
            scope.wiki = { title: title };
            scope.addWiki();
            httpBackendMock.flush();
            expect(scope.success).toBeTruthy();
        });
    });

});