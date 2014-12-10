/** @jsx React.DOM */

var React = require("react");
var EditEntity = require("./editentity");
var CorpStore = require("../stores/corpstore");
var CorpSchema = require("./corpschema");
var Router = require("react-router");

var Navigation = Router.Navigation;

var CorpEdit = React.createClass({

    mixins: [Navigation],

    convertToFormData: function(entityData) {
        corpData = entityData;
        if(!corpData) return {};
        return {
            id: corpData.id,
            name: corpData.name,
            email: corpData.contact.email,
            primaryPhone: corpData.contact.primaryPhone,
            domain: corpData.domain
        }

    },

    onSuccess: function(id) {
        console.log("CorpEdit::onSuccess id: " + JSON.stringify(id));
        this.transitionTo('/admin/corp/view/:id', {id: id}, {action: "edit"});
    },

    render: function () {
        return (
            <div>
                <EditEntity id={this.props.params.id}
                            schema={CorpSchema}
                            store={CorpStore}
                            onSuccess={this.onSuccess}
                            convertToFormData={this.convertToFormData}
                />
            </div>
        );

    }
})

module.exports = CorpEdit;
