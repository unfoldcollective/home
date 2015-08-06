'use strict';

let React = require('react'),
    Router = require('react-router');

let { Route, Redirect, RouteHandler, DefaultRoute, NotFoundRoute } = Router;

//routes
var routes = (
    <Route path='/' handler={require('./app')}/>
);

/*
* entry point
* */
Router.run(routes, function (Handler, state) {
    //console.log('run::() ', state);
    //fires when the url changes
    React.render(<Handler {...state}/>, document.body);
});





