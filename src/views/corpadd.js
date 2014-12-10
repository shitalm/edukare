/** @jsx React.DOM */

var React = require("react");
var CorpStore = require("../stores/corpstore");
var EntityForm = require("./entityform");
var CorpSchema = require("./corpschema");
var Router = require("react-router");

var Navigation = Router.Navigation;


var actionType = "add";

var CorpAdd = React.createClass({

    mixins: [Navigation],

    onSuccess: function(id) {
        console.log("CorpAdd::onSuccess id: " + JSON.stringify(id));
        this.transitionTo('/admin/corp/view/:id', {id: id}, {action: actionType});
    },

    render: function() {
        return(
            <EntityForm onSubmit={CorpStore.add} action={actionType}
                schema={CorpSchema} onSuccess={this.onSuccess}/>
        );
    }
})

module.exports = CorpAdd;
