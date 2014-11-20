global.TEST_DATABASE = "mongodb://localhost/TestDataBase_MEAN";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var sinon = require('sinon');
var request = require('request');
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
//var User = mongoose.model("User");
//var wiki = mongoose.model("Wiki");
//var wikiFacade = require('../../../server/DataLayer/wikiFacade');


describe('REST API for /wiki', function () {
    var wikiFacade, stub;
    //Start the Server before the TESTS
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
        wikiFacade = require('../../server/DataLayer/wikiFacade');
    });

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();

        testServer.close();
    });

    describe('getWiki tests', function () {

        beforeEach(function (done) {
            stub = sinon.stub(wikiFacade, 'getWiki');
            done();
        });

        afterEach(function () {
            if (stub) {
                stub.restore();
            }
        });

        it('should return a full wiki object', function (done) {
            var title = "Lorain County, Ohio";
            var wikiEntry = {
                "_id": "poop",
                "title": "Lorain County, Ohio",
                "url": "http://en.wikipedia.org/wiki/Lorain_County%2C_Ohio",
                "abstract": "Lorain County is a county located in the northeastern region...",
                "categories": [ "Lorain County, Ohio" ],
                "headings": [
                    { "heading": "Adjacent counties", "position": "2" },
                    { "heading": "Demographics", "position": "3" },
                    { "heading": "External links", "position": "6" },
                    { "heading": "Geography", "position": "1" },
                    { "heading": "Government", "position": "4" },
                    { "heading": "Municipalities and census-designated places", "position": "5" }
                ],
                "links": [ "http://en.wikipedia.org/wiki/Ohio" ]
            };
            stub.yields(null, wikiEntry);
            http.get("http://localhost:" + testPort + "/api/wiki/" + title, function (res) {
                res.setEncoding('utf8');
                var n = "";
                res.on('data', function (chunk) {
                    n += chunk;
                });
                res.on('end', function () {
                    n.should.equal(JSON.stringify(wikiEntry));
                    done();
                })
            });
        });

        it('should return error if no such title', function (done) {
            var title = "shit";
            stub.yields();
            request.get("http://localhost:" + testPort + "/api/wiki/" + title, {}, function (err, res, body) {
                res.statusCode.should.equal(404);
                done();
            });
        });
    });

    describe('findWiki tests', function () {

        beforeEach(function (done) {
            stub = sinon.stub(wikiFacade, 'findWiki');
            done();
        });

        afterEach(function () {
            if (stub) {
                stub.restore();
            }
        });

        it('should return a list with one object with title and abstract', function (done) {
            var search = "Lorain County, Ohio";
            var result = {
                "title": "Lorain County, Ohio",
                "abstract": "Lorain County is a county located in the northeastern region state of Ohio, United States, and is considered to be a part of what is locally referred to as Greater Cleveland. As of 2000, its population is 284,664."
            };
            stub.yields(null, result);
            request.get("http://localhost:" + testPort + "/api/wikilist/" + search, function (err, res, body) {
                body.should.equal(JSON.stringify(result));
                done();
            });

        });

        it('should return an empty list', function (done) {
            var search = "Lorsdin County, Ohio";
            stub.yields();
            request.get("http://localhost:" + testPort + "/api/wikilist/" + search, function (err, res, body) {
                res.statusCode.should.equal(404);
                done();
            })
        })
    });

    describe('getDescriptions tests', function () {

        it('should return a list of categories', function (done) {
            stub = sinon.stub(wikiFacade, 'getCategories');
            var result = ['cars', 'poop', 'lolz', 'last one'];
            stub.yields(null, result);
            request.get("http://localhost:" + testPort + "/api/categories", function (err, res, body) {
                body.should.equal(JSON.stringify(result));
                stub.restore();
                done();
            });
        });
    });

    describe('getWikisWithCategory tests', function () {
        beforeEach(function (done) {
            stub = sinon.stub(wikiFacade, 'getWikisWithCategory');
            done();
        });

        afterEach(function () {
            if (stub) {
                stub.restore();
            }
        });

        it('should return a list of titles and abstracts from one category', function (done) {
            var search = "IT";
            var result = [
                {
                    "title": "computer science",
                    "abstract": "bla bla bla"
                },
                {
                    "title": "computer science",
                    "abstract": "bla bla bla"
                }
            ];
            stub.yields(null, result);
            request.get("http://localhost:" + testPort + "/api/categories/" + search, function (err, res, body) {
                body.should.equal(JSON.stringify(result));
                done();
            });
        });

        it('should return an empty list (nothing found)', function (done) {
            var search = "IT";
            stub.yields();
            request.get("http://localhost:" + testPort + "/api/categories/" + search, function (err, res, body) {
                res.statusCode.should.equal(404);
                done();
            });
        });
    });

});
