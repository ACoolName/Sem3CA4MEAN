var express = require('express');
var router = express.Router();
var wikiFacade = require('../DataLayer/wikiFacade');
var mongoose = require('mongoose');
var dbModelWiki = mongoose.model('Wiki');

router.get('/wiki/:title', function (req, res) {
    wikiFacade.getWiki(req.params.title, function (err, wiki) {

        if (err) {
            res.status(err.status || 404);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        if (wiki == null) {
            res.status(404);
            res.send("{'err': 'Resource not found'}");
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(wiki));
    });
});

module.exports = router;


