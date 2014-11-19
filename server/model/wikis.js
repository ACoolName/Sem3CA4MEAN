var mongoose = require('mongoose');
var Wiki = mongoose.model('Wiki');


function getWiki (title, callback) {
    Wiki.findOne({"title": title}, function (err, entity) {
        err ? callback(err) : callback(null, entity);
    });
}

function findWiki (searchString, callback) {
    searchString = "." + searchString + ".";
    Wiki.find({"title": new RegExp(searchString, "i")},
	      function (err, entity) {
        err ? callback(err) : callback(null, entity);
    });
}


function getCategories (callback) {
    Wiki.find().distinct('categories', function (err, entities) {
        err ? callback(err) : callback(null, entities);
    });
}

function getWikisWithCategoryWhole (category, callback) {
    Wiki.find({"categories": category}, function (err, entities) {
        err ? callback(err) : callback(null, entities);
    });    
}

function getWikisWithCategory(searchString, callback){
    getWikisWithCategoryWhole(searchString, function(err, entities){
	var res = entities.map(function (obj) {
	    return {title: obj.title,
		    abstract: obj.abstract};
	});
	callback(null, res);
    });
}


module.exports = {getWiki:getWiki,
		  findWiki:findWiki,
		  getCategories:getCategories,
		  getWikisWithCategory:getWikisWithCategory,
		  getWikisWithCategoryWhole:getWikisWithCategoryWhole};
