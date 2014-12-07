/** @jsx React.DOM */
var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");

var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var ButtonLink = ReactRouterBootstrap.ButtonLink;
var Nav = ReactBootstrap.Nav;
var Panel = ReactBootstrap.Panel;
var NavItemLink = ReactRouterBootstrap.NavItemLink;


var CorpAdmin = React.createClass({
    render: function () {
        console.log("CorpAdmin::render");
        return (
            <div>
                <Panel>
                    <Nav bsStyle="pills" activeKey={1}>
                        <NavItemLink key={0} to="corpadd">Add</NavItemLink>
                        <NavItemLink key={1} to="corplist">List</NavItemLink>
                    </Nav>
                {/**
                    <ButtonToolbar activeKey={0}>
                        <ButtonLink bsStyle={this.state && this.state.active ? "primary" : null} to="corpadd" key={0}>Add</ButtonLink>
                        <ButtonLink bsStyle={this.state && this.state.active ? "primary" : null} to="corplist" key={1}>List</ButtonLink>
                    </ButtonToolbar>
                 **/}
                </Panel>
                {/* this is the important part */}
                <this.props.activeRouteHandler />
            </div>

        );
    }
})

module.exports = CorpAdmin;
