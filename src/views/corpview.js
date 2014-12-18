/** @jsx React.DOM */

var React = require("react");
var $ = require("jquery");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");
var CorpStore = require("../stores/corpstore");
var Router = require("react-router");
var EntityView = require("./viewentity");
var CorpSchema = require("./corpschema");

var PageHeader = ReactBootStrap.PageHeader;
var Table = ReactBootStrap.Table;
var Alert = ReactBootStrap.Alert;
var Button = ReactBootStrap.Button;
var ButtonToolbar = ReactBootStrap.ButtonToolbar;
var Link = ReactRouterBootstrap.ButtonLink;
var Nav = ReactBootStrap.Nav;


var CorpView = React.createClass({

    render: function () {
        var action = this.props.query && this.props.query.action ? this.props.query.action : "";
        return (
            <div>
                <EntityView
                    store={CorpStore}
                    schema={CorpSchema}
                    id={this.props.params.id}
                    name="Corporation"
                    action={action}
                />
            </div>
        )
    }
})

module.exports = CorpView;
