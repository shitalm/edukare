/** @jsx React.DOM */

var React = require("react");
var $ = require("jquery");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");
var Router = require("react-router");

var PageHeader = ReactBootStrap.PageHeader;
var Table = ReactBootStrap.Table;
var Alert = ReactBootStrap.Alert;
var Button = ReactBootStrap.Button;
var ButtonToolbar = ReactBootStrap.ButtonToolbar;
var Link = ReactRouterBootstrap.ButtonLink;
var Nav = ReactBootStrap.Nav;


var entityInstance = function (entitySchema, entityData, onDelete) {
    if (!entityData) return;
    return (
        <div>
            <Table>
                <tbody>
                    {entitySchema.map(function (node) {
                        console.log("viewentity::node" + JSON.stringify(node));
                        return (
                            <tr key={node.props.name}>
                                <td>{node.props.label}</td>
                                <td>{entityData[node.props.name]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Link  to="edit" id={entityData.id} bsStyle="primary">Edit</Link>
                <Button onClick={onDelete} bsStyle="danger" value={entityData.id}>Delete</Button>
            </ButtonToolbar>

        </div>
    );
};

var EntityView = React.createClass({
    getInitialState: function () {
        return {
            data: null,
            alert: null
        };
    },

    setFormData: function (entityData) {
        var schema = this.props.schema;
        console.log("EntityView::setFormData entity=" + JSON.stringify(entityData));
        var formData = entityData;
        if(schema.props.convertToFormData) formData = schema.props.convertToFormData(entityData);
        this.setState({data: formData});
    },


    processError: function (url, status, error) {
        console.error("EntityView::processError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },

    onDelete: function (e) {
        entityId = e.target.value;
        console.log("EntityView::onDelete entityId=" + JSON.stringify(entityId));
        this.props.store.remove(entityId, this.onDeleteSuccess, this.onDeleteFailure)
    },

    onDeleteSuccess: function (entity) {
        console.log("EntityView::processDeleteSuccess id: " + entity.id);
        this.setState({data: null})
        this.setState({alert: <Alert bsStyle="success">Successfully deleted {this.props.name}!</Alert>});
    },

    onDeleteFailure: function (url, status, error) {
        console.error("EntityView::onDeleteFailure id: " + this.props.id);
        this.setState({alert: <Alert bsStyle="warning">Failed to delete delete {this.props.name}. Error: {error.toString()} </Alert>});
    },

    componentDidMount: function () {
        console.log("EntityView::componentDidMount entityId: " + this.props.id);
        var action = this.props.action;
        if (action == "add") {
            this.setState({alert: <Alert bsStyle="success">Successfully added new {this.props.name}.</Alert>});
        } else if (action == "edit") {
            this.setState({alert: <Alert bsStyle="success">Successfully edited {this.props.name}.</Alert>});
        }
        this.props.store.get(this.props.id, this.setFormData, this.processError);
    },

    render: function () {
        return (
            <div>
                <h2>{this.props.name} View</h2>
                {entityInstance(this.props.schema, this.state.data, this.onDelete)}
                {this.state.alert}
            </div>
        )
    }
})

module.exports = EntityView;
