'use strict';

global.TEST_DATABASE = "mongodb://localhost/TestDataBase_MEAN";
var db = require('../../server/model/db');
var mongoose = require("mongoose");
var Wiki = mongoose.model("Wiki");


/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('/');

    it('should automatically redirect to /wiki when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/wiki");
    });


    describe('wiki', function () {

        beforeEach(function (done) {
            browser.get('#/wiki');
            console.log("beorere");
            Wiki.remove({}, function () {
                var array = [
                    {title: "Fake One", abstract: "A fake abstract"},
                    {title: "Fake Two", abstract: "A sentence"}
                ];
                Wiki.create(array, function (err) {
                    done();
                });
            });
        });


        it('should render view1 when user navigates to /wiki', function () {
            console.log("search");
            var searchTerm = element(by.model('searchTerm'));
            searchTerm.sendKeys('Fake');
            element(by.id('btn1')).click().then(function () {
                var wikis = element.all(by.repeater('wiki in wikis'));
                expect(wikis.count()).toEqual(2);
            });
        });

    });
});
