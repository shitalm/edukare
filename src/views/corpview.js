/** @jsx React.DOM */

var React = require("react");
var $ = require("jquery");
var ReactBootStrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");
var CorpStore = require("../stores/corpstore");
var Router = require("react-router");

var PageHeader = ReactBootStrap.PageHeader;
var Table = ReactBootStrap.Table;
var Alert = ReactBootStrap.Alert;
var Button = ReactBootStrap.Button;
var ButtonToolbar = ReactBootStrap.ButtonToolbar;
var Link = ReactRouterBootstrap.ButtonLink;
var Nav = ReactBootStrap.Nav;


var corpInstance = function (corp, onDelete) {
    if (!corp) return;
    return (
        <div>
            <Table>
                <tbody>

                    <tr>
                        <td>Id</td>
                        <td>{corp.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{corp.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{corp.contact.email}</td>
                    </tr>
                    <tr>
                        <td>Primary Phone</td>
                        <td>{corp.contact.primaryPhone}</td>
                    </tr>
                    <tr>
                        <td>Domain</td>
                        <td>{corp.domain}</td>
                    </tr>

                </tbody>
            </Table>
            <ButtonToolbar>
                <Link  to="corpedit" corpId={corp.id} bsStyle="primary">Edit</Link>
                <Button onClick={onDelete} bsStyle="danger" value={corp.id}>Delete</Button>
            </ButtonToolbar>

        </div>
    );
};

var CorpView = React.createClass({
    getInitialState: function () {
        return {
            data: null,
            alert: null
        };
    },

    setCorpData: function (corpData) {
        console.log("corpview::setCorpData corpData=" + JSON.stringify(corpData));
        this.setState({data: corpData});
    },

    processError: function (url, status, error) {
        console.error("corpview::processError", url, status, error);
        this.setState({alert: <Alert bsStyle="warning">Sorry, we encountered an error: {error.toString()}</Alert>});
    },

    onDelete: function (e) {
        corpId = e.target.value;
        console.log("corplist::onDelete corpid=" + JSON.stringify(corpId));
        CorpStore.remove(corpId, this.onDeleteSuccess, this.onDeleteFailure)
    },

    onDeleteSuccess: function (corp) {
        console.log("corplist::processDeleteSuccess id: " + corp.id);
        this.setState({data: null})
        this.setState({alert: <Alert bsStyle="success">Successfully deleted corporation!</Alert>});
    },

    onDeleteFailure: function (url, status, error) {
        console.error("corplist::onDeleteFailure id: " + corp.id);
        this.setState({alert: <Alert bsStyle="warning">Failed to delete delete corporation. Error: {error.toString()} </Alert>});
    },

    componentDidMount: function () {
        console.log("CorpView::componentDidMount corpId: " + this.props.params.corpId);
        console.log("CorpView::componentDidMount query=" + JSON.stringify(this.props.query));
        if (this.props.query.action == "add") {
            this.setState({alert: <Alert bsStyle="success">Successfully added new corporation.</Alert>});
        } else if (this.props.query.action == "edit") {
            this.setState({alert: <Alert bsStyle="success">Successfully edited corporation.</Alert>});
        }
        CorpStore.get(this.props.params.corpId, this.setCorpData, this.processError);
    },

    render: function () {
        console.log("CorpView::render params: " + JSON.stringify(this.props.params));
        console.log("CorpView::render query: " + JSON.stringify(this.props.query));
        return (
            <div>
                <h2>Corp View</h2>
                {corpInstance(this.state.data, this.onDelete)}
                {this.state.alert}
            </div>
        )
    }
})

module.exports = CorpView;
