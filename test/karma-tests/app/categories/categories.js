describe('meanApp.categories view2Ctrl', function () {

    describe('myController', function () {
        var $scope;

        beforeEach(module('meanApp.view2'));

        //Mocks for the test
        beforeEach(module({
        }));

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('View2Ctrl', {$scope: $scope});
        }));5
    });
});