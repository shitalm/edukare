/** @jsx React.DOM */

var ReactForms = require('react-forms')
var Schema = ReactForms.schema.Schema
var Property = ReactForms.schema.Property


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

module.exports=schema;
