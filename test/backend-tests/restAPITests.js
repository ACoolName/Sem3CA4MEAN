global.TEST_DATABASE = "mongodb://localhost/TestDataBase_MEAN";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var sinon = require('sinon');
var request = require('request');
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var User = mongoose.model("User");


describe('REST API for /user', function () {
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
    });

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    })
});
