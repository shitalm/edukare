/** @jsx React.DOM */
var React = require("react");
var AdminRoutes = require("./routes/admin-routes");
var SubscriberRoutes = require("./routes/subscriber-routes");

var routes;

if(APP.name === "SUBSCRIBER_APP") {
    routes = SubscriberRoutes;
} else {
    routes = AdminRoutes;
}

React.renderComponent(routes, document.body);
