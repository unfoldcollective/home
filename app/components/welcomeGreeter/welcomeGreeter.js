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
                        Congue a <a href='#'>vitae justo</a> condimentum dapibus nisl cubilia vestibulum fermentum primis cubilia vestibulum adipiscing tempus elit a adipiscing a ut suscipit viverra adipiscing a. Placerat parturient auctor suscipit adipiscing a nullam suspendisse vestibulum sed blandit molestie a parturient ante leo scelerisque aliquet a leo leo blandit a scelerisque a luctus suspendisse mollis suspendisse.
                    </p>
                </div>
            </div>
        );
    }

});

module.exports = WelcomeGreeter;
