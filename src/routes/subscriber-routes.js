/** @jsx React.DOM */
var React = require("react");
var Nav = require("react-bootstrap/Nav");
var Navbar = require("react-bootstrap/Navbar");
var NavItemLink = require("react-router-bootstrap").NavItemLink;
var Router = require("react-router");
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var Home = require("../views/home");
var QueryBox = require("../views/query");
var Inbox = require("../views/inbox");


global.React = React;

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
                            <NavItemLink key={2} to="inbox">Inbox</NavItemLink>
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
//

var routes = (
    <Routes>
        <Route name="app" path="/" handler={App}>
            <Route name="home" path="home" handler={Home}/>
            <Route name="inbox" path="inbox"  handler={Inbox}>
                <Route name="query" path="query/:queryId" handler={QueryBox}/>
                <DefaultRoute name="def-query" handler={QueryBox} />
            </Route>
            <Route name="aboutus" path="aboutus.html" handler={Inbox}/>
            <DefaultRoute handler={Home}/>
        </Route>
    </Routes>
);

module.exports = routes;
