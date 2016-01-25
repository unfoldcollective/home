'use strict';

let React = require('react'),
    _ = require('lodash');

/*
 *
 * */
require('./less/app.less');
require('./less/buttons.less');

/*
 *
 * */

let pipelineMixin = require('./pipelineMixin.js');

// let Layer2d = require('./components/layer2d/layer2d');
// let WelcomeGreeter = require('./components/welcomeGreeter/welcomeGreeter');
let MinimalForm = require('./components/minimalForm/minimalForm');
let Logo = require('./components/logo/logo');
let BGSlideshow = require('./components/bgslideshow/bgslideshow');

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

        let formQuestions = [
            {
                label: '',
                name: 'MERGE0',
                type: 'email',
            }
        ];

        let extraInputs = [
            {
                type: 'hidden',
                name: 'u',
                value: '1148c6e6167970b60623693d2',
            },
            {
                type: 'hidden',
                name: 'id',
                value: 'b342e4f2fa',
            }
        ];

        let slideImages = [
            {
                url: './assets/img/1.jpg',
                caption: 'We were commissioned by the Warwick Manufacturing Group to make tangible the concept of supply chains',
            },
            {
                url: './assets/img/2.jpg',
                caption: 'We created a toolkit for Pohoda Festival to help them with the design of their festival. #DroneFlying #Photoscanning #3DPrinting',
            },
            {
                url: './assets/img/3.jpg',
                caption: 'We helped Fablab to tell the story of their maker community',
            },
        ];

        return (
                <div className='App'>
                    <section className="text-side">
                        <div className='welcomeText row mainContent'>
                            <p>
                            We are a collective exploring how emerging technology can support innovative forms of narrative.
                            </p>
                            <br/>
                            <div className='newsletter'>
                                <p>We share whats on our mind occasionally through our newsletter.</p>
                                <MinimalForm className='MinimalForm' placeholder='Your email address' questions={formQuestions} extrainputs={extraInputs} progresscount={false} />
                            </div>
                        </div>
                    </section>
                    <section className='image-side'>
                        <Logo/>
                        <BGSlideshow images={slideImages} interval={5000} duration={800} autoplay={true} controls={true} captions={true}/>
                    </section>
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

        // console.log('%c %s', 'color: green; background-color: white;', 'app::componentWillMount() ');
    },

    // Invoked once after the first render
    componentDidMount: function () {
        // You now have access to this.getDOMNode()
        // console.log('%c %s', 'color: green; background-color: white;', 'app::componentDidMount() ');
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



