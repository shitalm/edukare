/** @jsx React.DOM */

var $ = require("jquery");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");

var PageHeader = ReactBootStrap.PageHeader;
var Table = ReactBootStrap.Table;
var Link = ReactRouterBootstrap.NavItemLink;

var CorpView = React.createClass({
    render: function() {
        console.log("CorpView::render params: " + JSON.stringify(this.props.params));
        return(
            <h2>Corp View Page - Id: {this.props.params.corpId}</h2>
        )
    }
})

module.exports = CorpView;
