/** @jsx React.DOM */

var React = require("react");
var CorpStore = require("../stores/corpstore");
var CorpForm = require("./corpform");

var CorpAdd = React.createClass({
    render: function() {
        return(
            <CorpForm onSubmit={CorpStore.add} action="add"/>
        );
    }
})

module.exports = CorpAdd;
