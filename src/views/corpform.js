/** @jsx React.DOM */

var React = require('react')
var ReactForms = require('react-forms')
var ReactBootStrap = require("react-bootstrap");
var CorpStore = require("../stores/corpstore");
var Router = require("react-router");

var Form = ReactForms.Form
var Schema = ReactForms.schema.Schema
var List = ReactForms.schema.List
var Property = ReactForms.schema.Property
var Alert = ReactBootStrap.Alert;
var Navigation = Router.Navigation;

var schema = (
    <Schema>
        <Property
            name="name"
            required
            label="Name"
            input={<input type="text" />}
        />
        <Property
            name="email"
            required
            label="Email"
            input={<input type="email" />}
            validate={function (v) {
                return /.+\@.+\..+/.test(v)
            }}
        />
        <Property
            name="primaryPhone"
            label="Primary Phone"
            required
            input={<input type="phone" />}
        />
        <Property
            name="domain"
            label="Email Domain"
            required
            input={<input type="text" />}
        />
    </Schema>
)

var CorpForm = React.createClass({

    mixins: [Navigation],

    getInitialState: function () {
        return {}
    },

    render: function () {
        console.log("corpform::render state=" + JSON.stringify(this.state));
        console.log("corpform::render props=" + JSON.stringify(this.props));

        // render Form as <div /> and transfer all props to it
        var form =
            <Form ref="form" component={React.DOM.div} schema={schema} value={this.props.value} />


        // return <form /> component with rendered form and a submit button
        return (
            <form onSubmit={this.onSubmit} className="AddCorpForm">
            {form}
                <button type="submit">Submit</button>
            {this.state.alert}
            </form>
        )
    },

    onSuccess: function(corpId) {
        console.log("corpform::onSuccess new corpId: " + JSON.stringify(corpId));
        this.transitionTo('/admin/corp/view/:corpId', {corpId: corpId}, {action: this.props.action});
    },

    onError: function(url, status, error) {
        console.error("corpform::onError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },

    onSubmit: function (e) {
        var corpData = this.refs.form.value().serialized;
        e.preventDefault()

        // check if form is valid
        var validation = this.refs.form.value().validation
        if (ReactForms.validation.isFailure(validation)) {
            console.log('invalid form');
            this.setState({alert: <Alert bsStyle="warning">You have entered some invalid values. Fix them and try again.</Alert>});
            return
        }

        //console.log(this.refs.form.value().value)
        console.log("Serialized value: " + JSON.stringify(corpData));
        this.props.onSubmit(corpData, this.onSuccess, this.onError);
        //CorpStore.add(corpData, this.onSuccess, this.onError);
        //console.log(this.refs.form.valueOf().state.value.serialized)
    }
});

module.exports = CorpForm;
