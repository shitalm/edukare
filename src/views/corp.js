/** @jsx React.DOM */
var React = require("react");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");

var ButtonToolbar = ReactBootStrap.ButtonToolbar;
var Link = ReactRouterBootstrap.ButtonLink;
var Panel = ReactBootStrap.Panel;


var CorpAdmin = React.createClass({
    render: function () {
        console.log("CorpAdmin::render");
        return (
            <div>
                <Panel>
                    <ButtonToolbar>
                        <Link to="corpadd" bsStyle="primary">Add</Link>
                        <Link to="corplist" bsStyle="primary">List</Link>
                    </ButtonToolbar>
                </Panel>
                {/* this is the important part */}
                <this.props.activeRouteHandler />
            </div>

        );
    }
})

module.exports = CorpAdmin;
