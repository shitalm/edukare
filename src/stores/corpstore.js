var BaseStore = require("./basestore");

var get = function(corpId, onSuccess, onError) {
    console.log("corpStore::get");
    BaseStore.getQuery("admin/corp/" + corpId, onSuccess, onError);
};

var list = function(onSuccess, onError) {
    console.log("corpStore::list");
    BaseStore.getQuery("admin/corp", onSuccess, onError);
};

var add = function(corp, onSuccess, onError) {
    console.log("corpStore::add");
    BaseStore.addQuery("admin/corp/", corp, onSuccess, onError);
};

var update = function(corp, onSuccess, onError) {
    console.log("corpStore::update corp=" + JSON.stringify(corp));
    BaseStore.updateQuery("admin/corp/" + corp.id, corp, onSuccess, onError);
};

module.exports = {get:get, list:list, update:update, add:add};
