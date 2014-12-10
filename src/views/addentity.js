/** @jsx React.DOM */

var React = require('react')
var ReactForms = require('react-forms')
var ReactBootStrap = require("react-bootstrap");
var CorpStore = require("../stores/corpstore");
var Router = require("react-router");

var Form = ReactForms.Form
var FormFor = ReactForms.FormFor
var Schema = ReactForms.schema.Schema
var List = ReactForms.schema.List
var Property = ReactForms.schema.Property
var RadioButtonGroup = ReactForms.input.RadioButtonGroup
var Alert = ReactBootStrap.Alert;
var Navigation = Router.Navigation;

var AddEntityForm = React.createClass({

    mixins: [Navigation],

    getInitialState: function () {
        return {}
    },

    render: function () {
        console.log(this.state)

        // render Form as <div /> and transfer all props to it
        var form =
            <Form ref="form" component={React.DOM.div} schema={this.props.schema}/>


        // return <form /> component with rendered form and a submit button
        return (
            <form onSubmit={this.onSubmit} className="AddCorpForm">
            {form}
                <button type="submit">Submit</button>
            {this.state.alert}
            </form>
        )
    },

    onSuccess: function(id) {
        console.log("entityadd::onSuccess new id: " + id);
        this.transitionTo('/admin/corp/view/:corpId', {id: id}, {addSuccess: "true"});
    },

    onError: function(url, status, error) {
        console.error("corpadd::onError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },

    onSubmit: function (e) {
        var corpData = this.refs.form.value().serialized;
        var store = this.props.store;
        e.preventDefault()

        // check if form is valid
        var validation = this.refs.form.value().validation
        if (ReactForms.validation.isFailure(validation)) {
            console.log('invalid form');
            this.setState({alert: <Alert bsStyle="warning">You have entered some invalid values. Fix them and try again.</Alert>});
            return
        }

        //console.log(this.refs.form.value().value)
        console.log("Serialized value: " + JSON.stringify(corpData))
        store.add(corpData, this.onSuccess, this.onError);
        //console.log(this.refs.form.valueOf().state.value.serialized)
    }
});


module.exports = AddEntityForm;
