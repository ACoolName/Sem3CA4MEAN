global.TEST_DATABASE = "mongodb://localhost/TestDataBase_MEAN";

var db = require("../../server/model/db");
var should = require("should");
var wiki = require("../../server/model/wikis");
var mongoose = require('mongoose');
var wikiModel = mongoose.model('Wiki');
var sinon = require('sinon');


describe('wiki wrapper test', function () {
    var dummyData = {
        title: "An American in Paris",
        url: "http://en.wikipedia.org/wiki/An_American_in_Paris",
        abstract: "An American in Paris is a symphonic composition by  the form of an extended tone poem evoking the sights and energy of the French capital in the 1920s.",
        categories: ["Symphonic poems",
            "Mega",
            "Party",
            "Awesome",
            "Party"],
        headings: [
            {
                heading: "Compositions by George Gershwin",
                position: "1"
            },
            {
                heading: "Symphonic poems",
                position: "2"
            }
        ],
        links: ["http://en.wikipedia.org/wiki/1920s", "http://en.wikipedia.org/wiki/Gene_Kelly"]
    };

    beforeEach(function (done) {
        var dummy = new wikiModel(dummyData);
        dummy.save();
        done()
    });

    describe('getWiki', function () {
        it("should get the wiki with existing title", function (done) {
            var title = "An American in Paris";
            wiki.getWiki(title, function (err, entity) {
                entity.title.should.equal(title);
                entity.url.should.equal(dummyData.url);
                done()
            });
        });
        it("should return err with non-existing title", function (done) {
            var title = "An American in Dubai";
            wiki.getWiki(title, function (err, entity) {
                should.not.exist(entity);
                done()
            });
        });
    });

    describe('getWikisWithCategory', function () {
        it("should return wikis with category", function (done) {
            var f = wiki.getWikisWithCategory;
            f("Symphonic poems", function (err, entities) {
                var keys = Object.keys(entities[0]);
                entities.should.not.equal(null);
                entities[0].title.should.equal(dummyData.title);
                keys.length.should.equal(2);
                done()
            });
        });
    });

    describe('getCategories', function () {
        it("should return categories", function (done) {
            var f = wiki.getCategories;
            f(function (err, entities) {
                entities.length.should.equal(4);
                done()
            });
        });
    });

    describe('findWiki', function () {
        it("should return wiki object by partial", function (done) {
            var f = wiki.findWiki;
            f("American", function (err, entities) {
                entities[0].title.should.equal(dummyData.title);
                done()
            });
        });
    });

    describe('add wiki',function(){
        it('should return new wiki object',function(done){
            var dummy = {
                title: "a",
                url: "b",
                abstract: "c",
                categories: ["aa",
                    "bb",
                    "cc",
                    "dd",
                    "ee"],
                headings: [
                    {
                        heading: "asd",
                        position: "1"
                    },
                    {
                        heading: "qwewqe",
                        position: "2"
                    }
                ],
                links: ["http://en.wikipedia.org/wiki/1920s", "http://en.wikipedia.org/wiki/Gene_Kelly"]
            };
            var newWiki = new wikiModel(dummy);
            newWiki.save();
            var f = wiki.addWiki(newWiki,function(err,ent){
                ent.size().should.equal(2);
            })
        })
    })

    afterEach(function (done) {
        wikiModel.remove({}, function (err) {
            console.log('collection removed');
            done();
        });
    });

});
