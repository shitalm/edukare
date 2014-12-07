/** @jsx React.DOM */

var $ = require("jquery");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");

var PageHeader = ReactBootStrap.PageHeader;
var Table = ReactBootStrap.Table;
var Link = ReactRouterBootstrap.NavItemLink;



var CorpInstance = function(corp, onClickHandler) {
    console.log("CorpInstance:: " + JSON.stringify(corp));
    return (
        <tr key={corp.domain}>
            <td><Link to="corpview" corpId={corp.id}>{corp.name}</Link></td>
            <td>{corp.email}</td>
            <td>{corp.primaryPhone}</td>
            <td>{corp.domain}</td>
            <td><Link to="corpedit" bsStyle="primary">Edit</Link></td>
        </tr>
    );
}


var CorpList = React.createClass({

    getInitialState: function () {
        return {
            corpList: null
        };
    },
    getQuery: function () {
        $.ajax({
            url: "api/corp/all.json",
            dataType: 'json',
            success: function (data) {
                this.setState({corpList: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        console.log("corpadmin::componentDidMount");
        this.getQuery();
    },
    render: function() {
        console.log("corpadmin::render corpList= " + JSON.stringify(this.state.corpList));
        return(
            <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Primary Phone</th>
                    <th>Domain</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
            {
                this.state.corpList && this.state.corpList.map(function(corp) {
                    return CorpInstance(corp, this.handleToggle);
                }, this)
            }
            </tbody>
            </Table>
        );
    }
});

var CorpAdmin = React.createClass({
    render: function() {
        return(
            <div>
                <CorpList />
            </div>
        );
    }
});

module.exports = CorpAdmin;
