'use strict';
var React = require('react');
require('./logo.less');

var Logo = React.createClass({

    render: function() {
        return (
            <div className='logo'>
                <h1>
                    <span className='double-border'>Unfold</span>
                </h1>
            </div>

        );
    }

});

module.exports = Logo;
