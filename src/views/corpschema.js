/** @jsx React.DOM */

var ReactForms = require('react-forms')
var Schema = ReactForms.schema.Schema
var Property = ReactForms.schema.Property

var convertToFormData = function(entityData) {
    corpData = entityData;
    if(!corpData) return {};
    return {
        id: corpData.id,
        name: corpData.name,
        email: corpData.contact.email,
        primaryPhone: corpData.contact.primaryPhone,
        domain: corpData.domain
    }

};

var schema = (
    <Schema convertToFormData={convertToFormData}>
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
);


console.log("corpschema");
console.log(schema);

module.exports=schema;
