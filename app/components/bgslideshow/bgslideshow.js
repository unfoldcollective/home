'use strict';
var React = require('react'),
    _ = require('lodash'),
    $ = require('jquery');


require('./bgslideshow.less');

var BGSlideshow = React.createClass({
  render: function() {
    let slideshowImages = _.map(this.props.images, function (item, index)
      {return (
        <div style={{backgroundImage: 'url(' + item.url + ')'}}></div>
        ); }, this
    );
    return (
        <div className="fadein">
          {slideshowImages}
        </div>
    );
  },
  // Invoked once after the first render
  componentDidMount: function () {
      // You now have access to this.getDOMNode()
      // console.log(this.getDOMNode(this));
      console.log(this.props.images);
      let interval = this.props.interval ? this.props.interval : 5000;
      let duration = this.props.duration ? this.props.duration : 400;
      $(function(){
          $('.fadein img:gt(0)').hide();
          setInterval(function(){
            // cross fade
            $('.fadein :first-child').fadeOut(duration)
               .next('div').fadeIn(duration)
               .end().appendTo('.fadein');
           }, interval);
      });
  },

});

module.exports = BGSlideshow;
