/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 05/08/2015
 * Time: 22:10
 */
'use strict';

let React = require('react');

let Layer2dProxy = React.createClass({
    mixins: [require('react-proxy?async!./layer2d').Mixin],
    renderUnavailable: function () {
        return <p>Loading...</p>;
    }
});

module.exports = Layer2dProxy;
                 
                 