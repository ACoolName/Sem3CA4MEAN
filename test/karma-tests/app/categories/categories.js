describe('meanApp.categories categoriesCtrl', function () {

    describe('myController', function () {
        var $scope;

        beforeEach(module('meanApp.viewCategories'));

        //Mocks for the test
        beforeEach(module({
        }));

        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('categoriesCtrl', {$scope: $scope});
        }));


    });
});