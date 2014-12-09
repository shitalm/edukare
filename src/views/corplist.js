/** @jsx React.DOM */

var $ = require("jquery");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");

var PageHeader = ReactBootStrap.PageHeader;
var Table = ReactBootStrap.Table;
var Link = ReactRouterBootstrap.NavItemLink;
var CorpStore = require("../stores/corpstore");
var Alert = ReactBootStrap.Alert;


var CorpInstance = function (corp, onClickHandler) {
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
        this.setState({alert: error.toString()});
    },

    componentDidMount: function () {
        console.log("corpadmin::componentDidMount");
        //this.getQuery();
        CorpStore.list(this.setData, this.processError);

    },
    render: function () {
        console.log("corpadmin::render corpList= " + JSON.stringify(this.state.corpList));
        var alert = <Alert bsStyle="warning">Sorry, we encountered an error: {this.state.alert}</Alert>
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
                return CorpInstance(corp, this.handleToggle);
            }, this)
                }
                    </tbody>
                </Table>
                {this.state.alert && alert}
            </div>

        );
    }
});


module.exports = CorpList;
