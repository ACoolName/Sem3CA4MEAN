var express = require('express');
var router = express.Router();
var wikiFacade = require('../DataLayer/wikiFacade');
var mongoose = require('mongoose');
var errorHandler = require("../services/errorHandler")
var dbModelWiki = mongoose.model('Wiki');

router.get('/wiki/:title', function (req, res) {
    wikiFacade.getWiki(req.params.title, function (err, wiki) {
        if (errorHandler.errorHandle(err, res, 500, 'internal')) {
            return;
        }
        if (errorHandler.errorHandle(!wiki, res, 404, 'not found')) {
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wiki));
    });
});

router.get('/wikilist/:search', function (req, res) {
    wikiFacade.findWiki(req.params.search, function (err, wikiList) {
        if (errorHandler.errorHandle(err, res, 500, 'internal')) {
            return;
        }
        if (errorHandler.errorHandle(!wikiList, res, 404, 'not found')) {
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wikiList));
    });
});

router.get('/categories', function (req, res) {
    wikiFacade.getCategories(function(err, categories) {
        if (errorHandler.errorHandle(err, res, 500, 'internal')) {
            return;
        }
        if (errorHandler.errorHandle(!categories, res, 404, 'not found')) {
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(categories));
    });
});

router.get('/categories/:search', function (req, res) {
    wikiFacade.getWikisWithCategory(req.params.search, function(err, wikiList) {
        if (errorHandler.errorHandle(err, res, 500, 'internal')) {
            return;
        }
        if (errorHandler.errorHandle(!wikiList, res, 404, 'not found')) {
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wikiList));
    });
});

module.exports = router;

router.post('wiki/:title',function(req,rest){
    var wiki = req.body;
    wikiFacade.addWiki(wiki,function(err,wiki){
        if (errorHandler.errorHandle(err, res, 400, 'cannot add this wiki')) {
            return;
        }
        res.header("Content-type","application/json");
        res.end(JSON.stringify(wiki));
    })
})
