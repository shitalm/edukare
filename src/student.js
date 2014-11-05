/** @jsx React.DOM */

(function() {
    var Panel = ReactBootstrap.Panel;
    var Input = ReactBootstrap.Input;

    var Comment = React.createClass({
        render: function () {
            var title = (
                <div>
                    <b>{this.props.author}</b> said on {this.props.date}</div>
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

    var QueryBox = React.createClass({
        getInitialState: function () {
            return {data: []};
        },
        getQuery: function (queryId) {
            $.ajax({
                url: "api/case/" + queryId,
                dataType: 'json',
                success: function (data) {
                    this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        componentDidMount: function () {
            this.getQuery(this.props.queryId);
        },
        componentWillReceiveProps: function(nextProps) {
            // for optimisation, don't do ajax call if old url is same as new url
            if(this.props.queryId != nextProps.queryId) {
                this.getQuery(nextProps.queryId);
            }
        },
        render: function () {
            return (
                <div className="commentBox" className="col-md-10">
                    <CommentList data={this.state.data} />
                    <CommentForm />
                </div>
            );
        }
    });

    var QueryNavigation = React.createClass({
        getInitialState: function () {
            return {openCases: [], activeKeyIndex: 0};
        },
        handleClick: function(cases, index){
            console.log("index:" + index + " cases= " + JSON.stringify(cases));
            //console.log(cases);
            this.props.onShowQuery(cases[index].id);
            this.setState({activeKeyIndex: index})
        },
        componentDidMount: function () {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                success: function (data) {
                    this.setState({openCases: data});
                    if(data && data.length > 0) this.props.onShowQuery(data[0].id);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        render: function() {
            var length = this.state.openCases.length;
            return (
                <Nav bsStyle="pills" stacked activeKey={this.state.activeKeyIndex} className="col-md-2"
                    onSelect={this.handleClick.bind(this, this.state.openCases)} >
                    {this.state.openCases.map(function(query, index) {
                        return(
                            <NavItem key={index} href={"api/case/" + query.id}>
                                {query.desc}
                            </NavItem>
                        )
                    })}
                    <NavItem key={length} href="closedcases.html">Closed Queries</NavItem>
                </Nav>
            )
        }
    });

    var QueryPage = React.createClass({
        getInitialState: function() {
            return {currentQueryId: "new"};
        },
        handleShowQuery: function(queryId) {
            this.setState({currentQueryId: queryId});
        },
        render: function(){
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <QueryNavigation
                                url="api/cases/open.json"
                                onShowQuery={this.handleShowQuery}
                                queryId={this.state.currentQueryId}
                            />
                            <QueryBox queryId={this.state.currentQueryId} />
                        </div>
                    </div>
                </div>
            );
        }
    });


    React.renderComponent(
        <QueryPage />,
        document.getElementById('content')
    );
})();   //anonymous self executing function to keep the global scope clean