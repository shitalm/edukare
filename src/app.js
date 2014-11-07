/** @jsx React.DOM */
"use strict";
var React = require("react");
var Student = require("./student");
var Navigation = require("./navigation");
var Nav = require("react-bootstrap/Nav");
var Navbar = require("react-bootstrap/Navbar");
var NavItemLink = require("react-router-bootstrap").NavItemLink;
var Router = require("react-router");
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

global.React = React;

/*
React.renderComponent(<Navigation/>, document.getElementById("navigation"));
React.renderComponent(<Student/>, document.getElementById("content"));
*/
//var brand = <a href="index.html" className="navbar-brand">Edukare</a>;
var brand = <Link to="home" className="navbar-brand">Edukare</Link>;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <header>
                    <Navbar componentClass={React.DOM.header} inverse
                        staticTop role="banner" brand={brand} toggleNavKey={0}
                        className="bs-docs-nav" fluid>
                        <Nav role="navigation" key={0} className="bs-navbar-collapse">
                            <NavItemLink key={1} to="home">Home</NavItemLink>
                            <NavItemLink key={2} to="student">Student</NavItemLink>
                            <NavItemLink key={3} to="aboutus">About Us</NavItemLink>
                        </Nav>
                    </Navbar>
                </header>
        {/* this is the important part */}
                <this.props.activeRouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Routes>
        <Route name="app" path="/" handler={App}>
            <Route name="home" path="index.html" handler={Student}/>
            <Route name="student" path="student.html" handler={Student}/>
            <Route name="aboutus" path="aboutus.html" handler={Student}/>
            <DefaultRoute handler={Student}/>
        </Route>
    </Routes>
);

React.renderComponent(routes, document.body);