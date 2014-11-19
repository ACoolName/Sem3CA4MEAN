'use strict';

describe('meanApp.viewWiki module', function () {
    var scope, httpBackendMock, ctrl, wikiFactory;
    beforeEach(module('meanApp.viewCategories'));
    beforeEach(module('meanApp.factories'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller, _WikiFactory_) {
        httpBackendMock = $httpBackend;
        wikiFactory = _WikiFactory_;
        scope = $rootScope.$new();
        ctrl = $controller('categoriesCtrl', {$scope: scope});
    }));

    describe('wikiGetCtrl controller functionality test in full isolation', function () {

        it('should exist', function () {
            expect(ctrl).toBeDefined();
        });

        it('should get the details about a wiki',function(){
            var dummy=["asd","bbb"];
            httpBackendMock.expectGET('api/categories').respond(dummy);
            httpBackendMock.flush();
            expect(scope.categories.length).toEqual(2);
        })
    })

});
