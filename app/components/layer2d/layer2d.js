/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 05/08/2015
 * Time: 22:10
 */
'use strict';

let React = require('react'),
    _ = require('lodash');

/*
 *
 * */
//require('./Layer2d.less');
/*
 *
 * */

var vectorizeText = require('vectorize-text');

var graph = vectorizeText('Hello world! 你好', {
    width: 500,
    textBaseline: 'hanging'
});

console.log('%c %s', 'color: green; background-color: white;', 'layer2d::() ', graph);


let schema = {};

let commonStyles = {
    //backgroundColor: 'rgba(255,0,0,.2)',
    padding: 0,
    margin: 0
};

let decoration = {
    borderBottom: '1px solid'
};


let Layer2d = React.createClass({

    // The object returned by this method sets the initial value of this.state
    getInitialState: function () {
        return {};
    },

    // The object returned by this method sets the initial value of this.props
    // If a complex object is returned, it is shared among all component instances
    propTypes: {
        points: React.PropTypes.array.isRequired
    }
    , getDefaultProps: function () {
        return {
            points: []
        };
    },

    // Returns the jsx markup for a component
    // Inspects this.state and this.props create the markup
    // Should never update this.state or this.props
    render: function () {
        let allStyles = _.merge({}, commonStyles, decoration, this.props.style);
        let styles = _.clone(commonStyles);

        return (
            <div className='Layer2d' style={allStyles}>

                <canvas ref='canvas' width={this.props.width} height={this.props.height} style={styles}/>
            </div>
        );
    },

    // An array of objects each of which can augment the lifecycle methods
    mixins: [],

    // Functions that can be invoked on the component without creating instances
    statics: {
        aStaticFunction: function () {
        }
    },

    // -- Lifecycle Methods --

    // Invoked once before first render
    componentWillMount: function () {
        // Calling setState here does not cause a re-render
    },

    // Invoked once after the first render
    componentDidMount: function () {
        // You now have access to this.getDOMNode()
    },

    // Invoked whenever there is a prop change
    // Called BEFORE render
    componentWillReceiveProps: function (nextProps) {
        // Not called for the initial render
        // Previous props can be accessed by this.props
        // Calling setState here does not trigger an an additional re-render
        //if(nextProps.points !== this.props.points){
        //console.log('layer2d::componentWillReceiveProps() ', nextProps.points);
        let canvas = this.refs.canvas;
        let ctx = canvas.getDOMNode().getContext('2d');


        let points = nextProps.points;
        //let points = graph.positions;
        //points = _.map(points, function (p) {
        //    return {x: p[0], y: p[1]};
        //});

        //graph.edges.forEach(function (e) {
        //    var p0 = graph.positions[e[0]];
        //    var p1 = graph.positions[e[1]];
        //    points.push({x: p0[0], y: p1[0]});
        //});


        ctx.clearRect(0, 0, nextProps.width, nextProps.height);
        for (var i = 0; i < points.length; i++) {
            ctx.beginPath();

            ctx.moveTo(points[0].x, points[0].y);

            for (var j = 1; j < points.length; j++) {
                //ctx.arc(points[j].x, points[j].y, 10, Math.PI * 2, true);
                ctx.lineTo(points[j].x, points[j].y);
            }
            //ctx.arc(points[points.length - 1].x, points[points.length - 1].y, 10, Math.PI * 2, true);
            ////ctx.strokeStyle = this.props.pointList[i].color;
            ctx.lineWidth = 1;
            ctx.stroke();
            //console.log('%c %s', 'color: green; background-color: white;', 'layer2d::componentWillReceiveProps() ');
        }
        //}
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

module.exports = Layer2d;
