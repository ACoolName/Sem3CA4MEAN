'use strict';

global.TEST_DATABASE = "mongodb://localhost/TestDataBase_MEAN";
var db = require('../../server/model/db');
var mongoose = require("mongoose");
var wiki = require("Wiki");

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('/');

    it('should automatically redirect to /view1 when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/wiki");
    });


    describe('wiki', function () {

        beforeEach(function () {
            browser.get('#/wiki');
        });


        it('should render view1 when user navigates to /wiki', function () {
            var wikis = element.all(by.repeater('item in items'));
            expect(wikis.count()).toEqual(2);
        });

    });
});
