var mongoose = require('mongoose');
var Wiki = mongoose.model('wiki');


function getWiki (title, callback) {
    Wiki.findOne({"title": title}, function (err, entity) {
        err ? callback(err) : callback(null, entity);
    });
}

function findWikiWhole (searchString, callback) {
    Wiki.find({"title": new RegExp(searchString, "i")},
	      function (err, entity) {
        err ? callback(err) : callback(null, entity);
    });
}

function findWiki(searchString, callback){
    findWikiWhole(searchString, function(err, entities){
	entities.forEach(function (obj) {
	    
	});
    });
}

function getCategories (callback) {
    Wiki.find().distinct('categories', function (err, entities) {
        err ? callback(err) : callback(null, entities);
    });
}

function getWikisWithCategory (category, callback) {
    Wiki.find({"categories": category}, function (err, entities) {
        err ? callback(err) : callback(null, entities);
    });    
}

module.exports = {getWiki:getWiki,
		  findWiki:findWiki,
		  getCategories:getCategories,
		  getWikisWithCategory:getWikisWithCategory,
		  findWikiWhole:findWikiWhole};
