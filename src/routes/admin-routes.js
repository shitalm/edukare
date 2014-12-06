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
var Home = require("./../views/home");
var Admin = require("./../views/admin");
var CorpAdmin = require("./../views/corp");
var CorpList = require("./../views/corplist");
var CorpEdit = require("./../views/corpedit");
var CorpAdd = require("./../views/corpadd");
var Plan = require("./../views/plan");

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
                            <NavItemLink key={2} to="corp">Admin</NavItemLink>
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
            <Route name="admin" path="admin"  handler={Admin}>
                <Route name="corp" path="corp" handler={CorpAdmin}>
                    <Route name="corplist" path="list" handler={CorpList}/>
                    <Route name="corpadd" path="add" handler={CorpAdd}/>
                    <Route name="corpedit" path="edit" handler={CorpEdit}/>
                    <DefaultRoute name="def-corp-list" handler={CorpList} />
                </Route>
                <Route name="plan" path="plan" handler={Plan}/>
                <DefaultRoute name="def-corp" handler={CorpList} />
            </Route>
            <Route name="aboutus" path="aboutus.html" handler={Home}/>
            <DefaultRoute handler={Home}/>
        </Route>
    </Routes>
);

module.exports = routes;
//React.renderComponent(routes, document.getElementById("admin"));
