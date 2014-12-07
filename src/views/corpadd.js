/** @jsx React.DOM */

var React            = require('react')
var ReactForms       = require('react-forms')
var ReactBootStrap = require("react-bootstrap");


var Form             = ReactForms.Form
var FormFor          = ReactForms.FormFor
var Schema           = ReactForms.schema.Schema
var List             = ReactForms.schema.List
var Property         = ReactForms.schema.Property
var RadioButtonGroup = ReactForms.input.RadioButtonGroup
var Alert = ReactBootStrap.Alert;

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
            validate={function(v) { return /.+\@.+\..+/.test(v) }}
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

var AddCorpForm = React.createClass({

    getInitialState: function() {
        return {}
    },

    render: function() {
        console.log(this.state)

        // render Form as <div /> and transfer all props to it
        var form =
            <Form ref="form" component={React.DOM.div} schema={this.props.schema}/>

        var alert = null;
        if(this.state.alertMessage) {
            alert = (
                <Alert bsStyle="warning">
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                </Alert>
            );
        }

        // return <form /> component with rendered form and a submit button
        return (
            <form onSubmit={this.onSubmit} className="AddCorpForm">
                {form}
                <button type="submit">Submit</button>
                {alert}
            </form>
        )
    },

    onSubmit: function(e) {
        e.preventDefault()

        // check if form is valid
        var validation = this.refs.form.value().validation
        if (ReactForms.validation.isFailure(validation)) {
            console.log('invalid form');
            this.setState({alertMessage: "You have entered some invalid values. Fix them and try again."});
            return
        }

        alert('form submitted!')
        //console.log(this.refs.form.value().value)
        console.log("Serialized value: " + JSON.stringify(this.refs.form.value().serialized))
        //console.log(this.refs.form.valueOf().state.value.serialized)
        console.log("State:" + this.state)
    }
});

var AddCorp = React.createClass({
    render: function() {
        return <AddCorpForm schema={schema}/>
    }
});

module.exports=AddCorp;
