/** @jsx React.DOM */

var React = require("react");
var CorpForm = require("./corpform");
var CorpStore = require("../stores/corpstore");


var CorpEdit = React.createClass({

    getInitialState: function () {
        return {
            data: null,
            alert: null
        };
    },

    processError: function (url, status, error) {
        console.error("CorpEdit::processError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },


    setCorpData: function (corpData) {
        console.log("CorpEdit::setCorpData corpData=" + JSON.stringify(corpData));
        this.setState({data: corpData});
    },

    componentDidMount: function () {
        console.log("CorpEdit::componentDidMount corpId: " + this.props.params.corpId);
        CorpStore.get(this.props.params.corpId, this.setCorpData, this.processError);
    },

    getCorp: function() {
        corpData = this.state.data;
        if(!corpData) return {};
        return {
            id: corpData.id,
            name: corpData.name,
            email: corpData.contact.email,
            primaryPhone: corpData.contact.primaryPhone,
            domain: corpData.domain
        }

    },

    update: function(corp, onSuccess, onError) {
        CorpStore.update(corp.id, corp, onSuccess, onError);
    },

    render: function () {
        var corp = this.getCorp();
        console.log("corpedit::render corp=" + JSON.stringify(corp));
        return (
            <div>
                <CorpForm onSubmit={this.update} value={corp} action="edit"/>
                {this.state.alert}
            </div>
        );

    }
})

module.exports = CorpEdit;
