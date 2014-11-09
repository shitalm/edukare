/** @jsx React.DOM */
"use strict";
var React = require("react");
var Input = require("react-bootstrap/Input");

var CommentForm = React.createClass({
    render: function () {
        return (
            <form className="commentForm">
                <Input type="textarea" placeholder="Say something..." />
                <Input type="submit" value="Post" />
            </form>
        );
    }
});

module.exports = CommentForm;
