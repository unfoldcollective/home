'use strict';
var React = require('react');

var Logo = require('../logo/logo');

var WelcomeGreeter = React.createClass({

    render: function() {
        return (
            <div className="welcomeGreeter">
                <Logo/>
                <h2>Welcome</h2>
                <div className='row mainContent'>
                    <p>
                        We are a collective exploring how emerging technology can support innovative forms of narrative.
                    </p>
                </div>
            </div>
        );
    }

});

module.exports = WelcomeGreeter;
