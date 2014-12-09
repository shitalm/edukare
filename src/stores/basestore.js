var $ = require("jquery");

//var BASEURL = "http://localhost/~shitalm/edukare/api/";
var BASEURL = "http://localhost:8080/api/";

var getQuery = function (url, onSuccess, onError) {
    console.log("baseStore::getQuery")
    $.ajax({
        url: BASEURL + url,
        dataType: 'json',
        success: function (data) {
            onSuccess(data);
        },
        error: function (url, status, err) {
            console.error(url, status, err.toString());
            onError(url, status, err);
        }
    });
};

var addQuery = function (url, postData, onSuccess, onError) {
    console.log("baseStore::addQuery")
    $.ajax({
        type: "POST",
        url: BASEURL + url,
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
};


var updateQuery = function (url, postData, onSuccess, onError) {
    console.log("baseStore::updateQuery")
    $.ajax({
        type: "POST",
        url: BASEURL + url,
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
};

var deleteQuery = function (url, onSuccess, onError) {
    console.log("baseStore::deleteQuery")
    $.ajax({
        type: "DELETE",
        url: BASEURL + url,
        dataType: 'json',
        success: function (data) {
            onSuccess(data);
        },
        error: function (url, status, err) {
            console.error(url, status, err.toString());
            onError(url, status, err);
        }
    });
};


module.exports = {getQuery:getQuery, addQuery: addQuery, updateQuery: updateQuery, deleteQuery: deleteQuery};
