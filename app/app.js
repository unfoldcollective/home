'use strict';

let React = require('react'),
    _ = require('lodash');

/*
 *
 * */
require('./app.less');
require('./less/buttons.less');

/*
 *
 * */

let pipelineMixin = require('./pipelineMixin.js');

let Layer2d = require('./components/layer2d/layer2d');
let WelcomeGreeter = require('./components/welcomeGreeter/welcomeGreeter');

let App = React.createClass({

    // The object returned by this method sets the initial value of this.state
    getInitialState: function () {
        return {};
    },

    // The object returned by this method sets the initial value of this.props
    // If a complex object is returned, it is shared among all component instances
    propTypes: {}
    , getDefaultProps: function () {
        return {};
    },

    // Returns the jsx markup for a component
    // Inspects this.state and this.props create the markup
    // Should never update this.state or this.props
    render: function () {
        //console.log('%c %s', 'color: green; background-color: white;', 'app::render() ');
        //<pre>{JSON.stringify(this.state.val, null, 4)}</pre>
        let points = this.state.val._pointerMoves;
        //points = _.chain(points)
        //    .takeRight(100)
        //    .map(function (p) {
        //        return {x: p.x + 20, y: p.y - 10};
        //    })
        //    .value();

        // console.log('app::render() ', points);


        return (
            <div>

                <div className='App container'>
                    <div className="row">
                        <div className="col-md-6">
                            <div className='text-center'>

                                <div className='row'>
                                    <div className='col-md-4 col-md-offset-4'>
                                        <span className='input input--chisato'>
                                            <input className='input__field input__field--chisato' type='text' id='input-22'/>
                                            <label className='input__label input__label--chisato' htmlFor='input-22'>
                                                <span className='input__label-content input__label-content--chisato'>Leave your email to stay up to date</span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                                <WelcomeGreeter/>
                                <button className='center-block button button--pipaluk button--text-thick button--text-upper'>Check out workshop</button>
                            </div>
                        </div>
                        <div className="col-md-6">





                        </div>
                    </div>
                </div>
            </div>
        );
    },


    // An array of objects each of which can augment the lifecycle methods
    mixins: [pipelineMixin],

    // Functions that can be invoked on the component without creating instances
    statics: {
        aStaticFunction: function () {
        }
    },

    // -- Lifecycle Methods --

    // Invoked once before first render
    componentWillMount: function () {
        // Calling setState here does not cause a re-render

        console.log('%c %s', 'color: green; background-color: white;', 'app::componentWillMount() ');
    },

    // Invoked once after the first render
    componentDidMount: function () {
        // You now have access to this.getDOMNode()
        console.log('%c %s', 'color: green; background-color: white;', 'app::componentDidMount() ');
    },

    // Invoked whenever there is a prop change
    // Called BEFORE render
    componentWillReceiveProps: function (nextProps) {
        // Not called for the initial render
        // Previous props can be accessed by this.props
        // Calling setState here does not trigger an an additional re-render
    },

    // Determines if the render method should run in the subsequent step
    // Called BEFORE a render
    // Not called for the initial render
    shouldComponentUpdate: function (nextProps, nextState) {
        // If you want the render method to execute in the next step
        // return true, else return false
        return true;
    },

    // Called IMMEDIATELY BEFORE a render
    componentWillUpdate: function (nextProps, nextState) {
        // You cannot use this.setState() in this method

    },

    // Called IMMEDIATELY AFTER a render
    componentDidUpdate: function (prevProps, prevState) {
    },

    // Called IMMEDIATELY before a component is unmounted
    componentWillUnmount: function () {
    }

});

module.exports = App;



