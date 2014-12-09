var $ = require("jquery");

//var URLPREFIX = "http://localhost/~shitalm/edukare/api/";
var URLPREFIX = "http://localhost:8080/api/";

module.exports = function() {

    var _baseUrl= "baseUrl";
    var _url= {};

    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
        _url.get = URLPREFIX + _baseUrl + "/:id";
        _url.list = URLPREFIX + _baseUrl;
        _url.add = URLPREFIX + _baseUrl;
        _url.update = URLPREFIX + _baseUrl + "/:id";
        _url.remove = URLPREFIX + _baseUrl + "/:id";
        console.log("setBaseUrl::get: " + _url.get);
        console.log("setBaseUrl::update: " + _url.update);
        console.log("setBaseUrl::remove: " + _url.remove);
    },

    this.get = function (id, onSuccess, onError) {
        console.log("baseStore::get")
        $.ajax({
            url: _url.get.replace(":id", id),
            dataType: 'json',
            success: function (data) {
                onSuccess(data);
            },
            error: function (url, status, err) {
                console.error(url, status, err.toString());
                onError(url, status, err);
            }
        });
    },

    this.list = function (onSuccess, onError) {
        console.log("baseStore::list");
        $.ajax({
            url: _url.list,
            dataType: 'json',
            success: function (data) {
                onSuccess(data);
            },
            error: function (url, status, err) {
                console.error(url, status, err.toString());
                onError(url, status, err);
            }
        });
    },

    this.add = function
        (postData, onSuccess, onError) {
        console.log("baseStore::add");
        $.ajax({
            type: "POST",
            url: _url.add,
            dataType: 'json',
            // below data should be a json string and not a json object and hence need to stringify
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: function (data) {
                onSuccess(data);
            },
            error: function (url, status, err) {
                console.error(url, status, err.toString());
                onError(url, status, err);
            }
        });
    },


    this.update = function (id, postData, onSuccess, onError) {
        console.log("baseStore::update");
        $.ajax({
            type: "POST",
            url: _url.update.replace(":id", id),
            dataType: 'json',
            // below data should be a json string and not a json object and hence need to stringify
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: function (data) {
                onSuccess(data);
            },
            error: function (url, status, err) {
                console.error(url, status, err.toString());
                onError(url, status, err);
            }
        });
    },


    this.remove = function (id, onSuccess, onError) {
        console.log("baseStore::remove id=" + id);
        $.ajax({
            type: "DELETE",
            url: _url.remove.replace(":id", id),
            success: function (data) {
                onSuccess(data);
            },
            error: function (url, status, err) {
                console.error(url, status, err.toString());
                onError(url, status, err);
            }
        });
    }
}


