/** @jsx React.DOM */

var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");
var ReactRouter = require("react-router");

var Nav = ReactBootstrap.Nav;
var Panel = ReactBootstrap.Panel;
var NavItemLink = ReactRouterBootstrap.NavItemLink;

var $ = require("jquery");

global.React = React;

var Navigation = React.createClass({
    render: function () {
        return (
            <Panel header="Admin" key={1}>
                <Nav bsStyle="pills" stacked activeKey={0}>
                    <NavItemLink key={0} to="corplist">Corporation</NavItemLink>
                    <NavItemLink key={1} to="plan">Plan</NavItemLink>
                </Nav>
            </Panel>
        );
    }
});

var Admin = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="col-md-2">
                    <Navigation/>
                </div>
                <div className="col-md-10">
                    {/* this is the important part */}
                    <this.props.activeRouteHandler />
                </div>
            </div>
        )
    }
});

module.exports = Admin;
