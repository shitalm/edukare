/** @jsx React.DOM */
"use strict";
var React = require("react");

var Home = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <ul className="nav nav-pills nav-stacked">
                            <li className="active">
                                <a href="#">Home</a>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Menu 1
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#">Submenu 1-1</a>
                                    </li>
                                    <li>
                                        <a href="#">Submenu 1-2</a>
                                    </li>
                                    <li>
                                        <a href="#">Submenu 1-3</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Menu 2</a>
                            </li>
                            <li>
                                <a href="#">Menu 3</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.</p>
                    </div>
                    <div className="col-md-3">
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</p>
                    </div>
                    <div className="col-md-3">
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                        rem aperiam.</p>
                    </div>

                    <div className="clearfix visible-lg"></div>
                </div>
            </div>
        );
    }
});

module.exports = Home;