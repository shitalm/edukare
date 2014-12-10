/** @jsx React.DOM */

var React = require("react");
var EntityForm = require("./entityform");

var EditEntity = React.createClass({

    getInitialState: function () {
        return {
            formdata: null,
            alert: null
        };
    },

    processError: function (url, status, error) {
        console.error("EditEntity::processError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },


    setFormData: function (entityData) {
        console.log("EditEntity::setFormData entity=" + JSON.stringify(entityData));
        var formData = entityData;
        if(this.props.convertToFormData) formData = this.props.convertToFormData(entityData);
        this.setState({formdata: formData});
    },

    componentDidMount: function () {
        console.log("EditEntity::componentDidMount id: " + this.props.id);
        this.getEntity();
    },

    getEntity: function() {
        this.props.store.get(this.props.id, this.setFormData, this.processError);
    },

    update: function(formData, onSuccess, onError) {
        var entityData = formData;
        if(this.props.convertFromFormData) entityData = this.props.convertFromFormData(formData);
        this.props.store.update(this.props.id, entityData, onSuccess, onError);
    },

    render: function () {
        console.log("corpedit::render formdata=" + JSON.stringify(this.state.formdata));
        return (
            <div>
                <EntityForm onSubmit={this.update} value={this.state.formdata} action={"edit"}
                    schema={this.props.schema} onSuccess={this.props.onSuccess}/>
                {this.state.alert}
            </div>
        );

    }
})

module.exports = EditEntity;
