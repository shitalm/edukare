/** @jsx React.DOM */

var React = require("react");
var Nav = require("react-bootstrap/Nav");
var Navbar = require("react-bootstrap/Navbar");
var NavItem = require("react-bootstrap/NavItem");
var NavItemLink = require("react-router-bootstrap").NavItemLink;
var Link = require("react-router").Link;
var $ = require("jquery");

global.React = React;


var QueryNavigation = React.createClass({
    render: function () {
        var length = this.props.openCases.length;
        return (
            <Nav bsStyle="pills" stacked activeKey={0}>
                    {
                        this.props.openCases.map(function (query, index) {
                            console.log("query: " + query.id + " index=" + index);
                            return (
                                <NavItemLink key={index} queryId={query.id} to="query">
                                {query.desc}
                                </NavItemLink>
                            );
                        })
                    }
            </Nav>
        )
    }
});

//                 <NavItemLink key={length} href="closedcases.html" to="query">Closed Queries</NavItemLink>

var Inbox = React.createClass({
    getInitialState: function () {
        return {
            currentQueryId: "new",
            openCases: [],
            activeKeyIndex: 0
        };
    },
    componentDidMount: function () {
        $.ajax({
            url: "api/cases/open.json",
            dataType: 'json',
            success: function (data) {
                this.setState({openCases: data});
                if (data && data.length > 0) this.setState({currentQueryId: data[0].id});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        console.log("inbox::render currentQueryId=" + this.state.currentQueryId);
        var length = this.state.openCases.length;
        return (
            <div className="container">
                <div className="col-md-2">
                    <QueryNavigation openCases={this.state.openCases} onShowQuery={this.showQuery} />
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