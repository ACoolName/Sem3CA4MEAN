describe('meanApp.view3 View3Ctrl', function () {
    beforeEach(module('meanApp.view3'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('View3Ctrl', {$scope: scope});
    }));
});