/** @jsx React.DOM */

var React = require('react')
var ReactForms = require('react-forms')
var ReactBootStrap = require("react-bootstrap");
var Router = require("react-router");

var Form = ReactForms.Form
var Schema = ReactForms.schema.Schema
var Property = ReactForms.schema.Property
var Alert = ReactBootStrap.Alert;
var Navigation = Router.Navigation;



var EntityForm = React.createClass({

    mixins: [Navigation],

    getInitialState: function () {
        return {}
    },

    render: function () {
        console.log("EntityForm::render state=" + JSON.stringify(this.state));
        console.log("EntityForm::render props=" + JSON.stringify(this.props));

        // render Form as <div /> and transfer all props to it
        var form =
            <Form ref="form" component={React.DOM.div} schema={this.props.schema} value={this.props.value} />


        // return <form /> component with rendered form and a submit button
        return (
            <form onSubmit={this.onSubmit} className="EntityForm">
            {form}
                <button type="submit">Submit</button>
            {this.state.alert}
            </form>
        )
    },

    onError: function(url, status, error) {
        console.error("EntityForm::onError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },

    onSubmit: function (e) {
        var data = this.refs.form.value().serialized;
        e.preventDefault()

        // check if form is valid
        var validation = this.refs.form.value().validation
        if (ReactForms.validation.isFailure(validation)) {
            console.log('invalid form');
            this.setState({alert: <Alert bsStyle="warning">You have entered some invalid values. Fix them and try again.</Alert>});
            return;
        }

        //console.log(this.refs.form.value().value)
        console.log("EntityForm::onSubmit serialized value: " + JSON.stringify(data));
        this.props.onSubmit(data, this.props.onSuccess, this.onError);
    }
});

module.exports = EntityForm;
