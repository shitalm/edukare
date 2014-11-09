/** @jsx React.DOM */

var React = require("react");
var $ = require("jquery");
var Panel = require("react-bootstrap/Panel");
var Nav = require("react-bootstrap/Nav");
var NavItem = require("react-bootstrap/NavItem");

var Comment = React.createClass({
    render: function () {
        var title = (
            <div>
                <b>{this.props.author}</b> said on {this.props.date}
            </div>
        );
        return (
            <Panel header={title}>
            {this.props.children}
            </Panel>
        );
    }
});

var CommentList = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} date={comment.date}>
                {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
            {commentNodes}
            </div>
        );
    }
});


var QueryBox = React.createClass({
    getInitialState: function () {
        return {queryId: "new", data: []};
    },
    getQuery: function (queryId) {
        $.ajax({
            url: "api/case/" + queryId,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data, queryId: queryId});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        console.log("query::componentDidMount state.queryId: " + this.state.queryId
        + " props.queryId:" + this.props.queryId);
        this.getQuery(this.state.queryId);
    },
    componentWillReceiveProps: function (nextProps) {
        // We accept queryId both in props and props.params to support routing
        var newQueryId = nextProps.params.queryId || nextProps.queryId;
        console.log("query::componentWillReceiveProps nextProps" + JSON.stringify(nextProps));
        console.log("newQueryId: " + newQueryId + " currentQueryId: " + this.state.queryId);
        // for optimisation, don't do ajax call if old url is same as new url
        if (this.state.queryId != newQueryId) {
            console.log("Fetching new query id: " + newQueryId);
            this.getQuery(newQueryId);
        }
    },
    render: function () {
        console.log("query::render " + JSON.stringify(this.state.data));
        return (
            <div className="commentBox" className="col-md-10">
                <CommentList data={this.state.data} />
            </div>
        );
    }
});

module.exports = QueryBox;

