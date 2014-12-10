/** @jsx React.DOM */

var $ = require("jquery");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");

var PageHeader = ReactBootStrap.PageHeader;
var Button = ReactBootStrap.Button;
var Table = ReactBootStrap.Table;
var Link = ReactRouterBootstrap.NavItemLink;
var CorpStore = require("../stores/corpstore");
var Alert = ReactBootStrap.Alert;


var CorpInstance = function (corp, onDelete) {
    console.log("CorpInstance:: " + JSON.stringify(corp));
    return (
        <tr key={corp.id}>
            <td>
                <Link to="corpview" corpId={corp.id}>{corp.name}</Link>
            </td>
            <td>{corp.contact.email}</td>
            <td>{corp.contact.primaryPhone}</td>
            <td>{corp.domain}</td>
            <td>
                <Link to="corpedit" corpId={corp.id} bsStyle="primary">Edit</Link>
            </td>
            <td>
                <Button onClick={onDelete} bsStyle="danger" value={corp.id}>Delete</Button>
            </td>
        </tr>
    );
}


var CorpList = React.createClass({

    getInitialState: function () {
        return {
            corpList: null,
            alert: null
        };
    },
    setData: function (data) {
        console.log("corplist::setData corpList=" + JSON.stringify(data));
        this.setState({corpList: data});
    },

    processError: function (url, status, error) {
        console.error("corplist::processError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },

    componentDidMount: function () {
        console.log("corpadmin::componentDidMount");
        //this.getQuery();
        CorpStore.list(this.setData, this.processError);
        if (this.props.query.action == "delete") {
            this.setState({alert: <Alert bsStyle="success">Successfully deleted corporation.</Alert>});
        }
    },

    onDelete: function(e) {
        corpId = e.target.value;
        console.log("corplist::onDelete corpid=" + JSON.stringify(corpId));
        CorpStore.remove(corpId, this.onDeleteSuccess, this.onDeleteFailure)
    },

    onDeleteSuccess: function(corp) {
        console.log("corplist::processDeleteSuccess id: " + corp.id);
        this.setState({alert: <Alert bsStyle="success">Successfully deleted corporation!</Alert>});
        CorpStore.list(this.setData, this.processError);
    },

    onDeleteFailure: function(url, status, error) {
        console.error("corplist::onDeleteFailure id: " + corp.id);
        this.setState({alert: <Alert bsStyle="warning">Failed to delete delete corporation. Error: {error.toString()} </Alert>});
    },


    render: function () {
        console.log("corpadmin::render corpList= " + JSON.stringify(this.state.corpList));
        return (
            <div>
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
            this.state.corpList && this.state.corpList.map(function (corp) {
                return CorpInstance(corp, this.onDelete);
            }, this)
                }
                    </tbody>
                </Table>
                {this.state.alert}
            </div>

        );
    }
});


module.exports = CorpList;
