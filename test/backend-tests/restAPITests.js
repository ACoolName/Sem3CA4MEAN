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
var wikiFacade = require('../../server/DataLayer/wikiFacade');


describe('REST API for /wiki', function () {
    //Start the Server before the TESTS
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function (done) {
        this.sinon = sinon.sandbox.create();
        done();
    });

    afterEach(function () {
        this.sinon.restore();
    });

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    describe('getWiki tests', function () {
        it('should return a full wiki object', function () {
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
            sinon.stub(wikiFacade, 'getWiki').withArgs(title).yields(wikiEntry);
            http.get("http://localhost:" + testPort + "/api/wiki/" + title, function (res) {
                res.setEncoding('utf8');
                var n = "";
                res.on('data', function(chunk) {
                    n += chunk;
                });
                res.on('end', function() {
                    n = JSON.parse(n);
                    n.should.equal(wikiEntry);
                })
            });
        })
    })

});
