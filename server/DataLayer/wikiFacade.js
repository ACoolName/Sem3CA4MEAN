var Wiki = require("../model/wikis");

function getWiki(title, callback) {
    Wiki.getWiki(title, callback);
}
function findWiki(searchString, callback) {
    Wiki.findWiki(searchString, callback);
}
function getCategories(callback) {
    Wiki.getCategories(callback);
}

function getWikisWithCategory(category, callback) {
    Wiki.getWikisWithCategory(category, callback);
}

module.exports = {getWiki: getWiki,
    findWiki: findWiki,
    getCategories: getCategories,
    getWikisWithCategory: getWikisWithCategory};
