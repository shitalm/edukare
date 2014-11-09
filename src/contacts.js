/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");

var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;

var App = React.createClass({
    render: function () {
        return(
            <div>
                <h1>Address Book</h1>
                <this.props.activeRouteHandler bar="foo" />
            </div>
        );
    }
});

var Contact = React.createClass({
    render: function () {
        return <h1>{this.props.params.id}</h1>
    }
});

var routes = (
    <Routes>
        <Route handler={App}>
            <Route name="contact" path="/contact/:id" handler={Contact}/>
        </Route>
    </Routes>
);

React.renderComponent(routes, document.body);


