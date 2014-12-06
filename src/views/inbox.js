/** @jsx React.DOM */

var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var ReactRouterBootstrap = require("react-router-bootstrap");
var ReactRouter = require("react-router");

var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var PanelGroup = ReactBootstrap.PanelGroup;
var Panel = ReactBootstrap.Panel;

var NavItemLink = ReactRouterBootstrap.NavItemLink;
var Link = ReactRouter.Link;

var $ = require("jquery");

global.React = React;

var panel = function(panelHeader, data, key) {
    return (
        <Panel header={panelHeader} key={key}>
            <Nav bsStyle="pills" stacked activeKey={0}>
                {
                    data.map(function (query, index) {
                        console.log("query: " + query.id + " index=" + index);
                        return (
                            <NavItemLink key={index} queryId={query.id} to="query">
                            {query.desc}
                            </NavItemLink>
                        );
                    })
                }
            </Nav>
        </Panel>
    );
}

var QueryNavigation = React.createClass({
    render: function () {
        return (
            <PanelGroup defaultActiveKey={1} accordian>
                {panel("Open Cases", this.props.openCases, 1)}
                {panel("Closed Cases", this.props.closedCases, 2)}
            </PanelGroup>
        );
    }
});

//                 <NavItemLink key={length} href="closedcases.html" to="query">Closed Queries</NavItemLink>

var Inbox = React.createClass({
    getInitialState: function () {
        return {
            currentQueryId: "new",
            openCases: [],
            closedCases: [],
            activeKeyIndex: 0
        };
    },
    setOpenCases: function(data) {
        this.setState({openCases: data});
        if (data && data.length > 0) this.setState({currentQueryId: data[0].id});
    },
    setClosedCases: function(data) {
        this.setState({closedCases: data});
    },
    getQueryList: function(queryUrl, callback) {
        $.ajax({
            url: queryUrl,
            dataType: 'json',
            success: function (data) {
                callback(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.getQueryList("api/cases/open.json", this.setOpenCases);
        this.getQueryList("api/cases/closed.json", this.setClosedCases);
    },

    render: function () {
        console.log("inbox::render currentQueryId=" + this.state.currentQueryId);
        var length = this.state.openCases.length;
        return (
            <div className="container">
                <div className="col-md-2">
                    <QueryNavigation openCases={this.state.openCases}
                        closedCases={this.state.closedCases}
                        onShowQuery={this.showQuery} />
                </div>
                <div className="col-md-10">
                    {/* this is the important part */}
                    <this.props.activeRouteHandler queryId={this.state.currentQueryId} />
                </div>
            </div>
        )
    }
});

module.exports = Inbox;