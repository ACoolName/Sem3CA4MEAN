'use strict';

global.TEST_DATABASE = "mongodb://localhost/TestDataBase_MEAN";
var db = require('../../server/model/db');
var mongoose = require("mongoose");
var Wiki = mongoose.model("Wiki");


/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('/');

    it('should automatically redirect to /home when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/home");
    });


    describe('wiki', function () {

        beforeEach(function (done) {
            browser.get('#/home');
            Wiki.remove({}, function () {
                var array = [

                ];
                Wiki.create(array, function (err) {
                    done();
                });
            });
        });


        it('should render view1 when user navigates to /wiki', function () {
            var wikis = element.all(by.repeater('wiki in wikis'));
            expect(wikis.count()).toEqual(2);
        });

    });
});
