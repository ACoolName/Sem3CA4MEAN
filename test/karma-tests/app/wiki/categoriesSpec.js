'use strict';

describe('meanApp.viewCategories module', function () {
    var scope, httpBackendMock, ctrl, wikiFactory;
    beforeEach(module('meanApp.viewCategories'));
    beforeEach(module('meanApp.factories'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller, _WikiFactory_) {
        httpBackendMock = $httpBackend;
        wikiFactory = _WikiFactory_;
        scope = $rootScope.$new();
        ctrl = $controller('categoriesCtrl', {$scope: scope});
    }));

    describe('wikiGetCtrl controller functionality test', function () {

        it('should exist', function () {
            expect(ctrl).toBeDefined();
        });

        it('Should get all categories', function () {
            var dummy=["asd","bbb"];
            httpBackendMock.expectGET('api/categories').respond(dummy);
            httpBackendMock.flush();
            expect(scope.currentCategories.length).toEqual(2);
        });

    });
});