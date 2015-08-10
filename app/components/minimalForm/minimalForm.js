'use strict';
var React = require('react'),
    _ = require('lodash');


require('./minimalForm.less');

var MinimalForm = React.createClass({

    render: function() {
        let formQuestions = _.map(this.props.questions, function (item, index)
          {return (
            <li>
                <span><label htmlFor={item.name}>{item.label}</label></span>
                <input id={'q' + index} name={item.name} type={item.type}/>
            </li>
        ); }, this);

        let extrainputs = _.map(this.props.extrainputs, function (item, index)
            {return (
                <input name={item.name} type={item.type} value={item.value}/>
        ); }, this);

        return (
            <form id='theForm' className='simform' autoComplete='off' action='http://unfold.us11.list-manage1.com/subscribe/post' method='POST'>
                {extrainputs}
                <div className='simform-inner'>
                    <ol className='questions'>
                        {formQuestions}
                    </ol>
                    <button className='submit' type='submit'>Send answers</button>
                    <div className='controls'>
                        <button className='next'></button>
                        <div className='progress'></div>
                        <span className={this.props.progresscount ? 'number' : 'number hide'}>
                            <span className='number-current'></span>
                            <span className='number-total'></span>
                        </span>
                        <span className='error-message'></span>
                    </div>
                </div>
                <span className='final-message'></span>
            </form>
        );
    },
    // Invoked once after the first render
    componentDidMount: function () {
        // You now have access to this.getDOMNode()
        console.log(this.getDOMNode(this));
    },

});

module.exports = MinimalForm;
