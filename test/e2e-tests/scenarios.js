'use strict';

global.TEST_DATABASE = "mongodb://localhost/TestDataBase_MEAN";
var db = require('../../server/model/db');
var mongoose = require("mongoose");
var User = mongoose.model("User");

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('/');

    it('should automatically redirect to /home when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/home");
    });


    describe('view1', function () {

        beforeEach(function () {
            browser.get('#/home');
        });


        it('should render home when user navigates to /home', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 1/);
        });

    });


    describe('view2', function () {

        beforeEach(function () {
            browser.get('#/categories');
        });


        it('should render categories when user navigates to /categories', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 2/);
        });

    });
});
