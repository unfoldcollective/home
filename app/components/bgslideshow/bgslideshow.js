'use strict';
var React = require('react'),
    _ = require('lodash'),
    $ = require('jquery'),
    FontAwesome = require('react-fontawesome');


require('./bgslideshow.less');

var BGSlideshow = React.createClass({
  render: function() {
    let slideshowImages = _.map(this.props.images, function (item, index)
      {return (
        <div id={'biimage-' + index} className='biimage' style={{backgroundImage: 'url(' + item.url + ')'}}></div>
        ); }, this
    );
    let slideshowCaptions = _.map(this.props.images, function (item, index)
      {return (
        <div id={'bicaption-' + index} className='bicaption'>{item.caption}</div>
        ); }, this
    );
    return (
      <div className='bgslideshow'>
        <div className="fadein">
          {slideshowImages}
        </div>
        {this.props.controls ? (
          <div id="bicontrols" className="bicontrols">
            <span className="biprev"><FontAwesome name='angle-left' /></span>
            <span className="biplaypause bipause"></span>
            <span className="binext"><FontAwesome name='angle-right' /></span>
          </div>
        ) : undefined}
        {this.props.captions ? (
          <div id="bicaptions" className="bicaptions">
            {slideshowCaptions}
          </div>
        ) : undefined}
      </div>
    );
  },
  // Invoked once after the first render
  componentDidMount: function () {
    // You now have access to this.getDOMNode()
    // console.log(this.getDOMNode(this));
    let interval = this.props.interval ? this.props.interval : 5000;
    let duration = this.props.duration ? this.props.duration : 400;
    var isSlideshowActive = this.props.autoplay ? true : false,
      $items = $('.fadein').children( 'div' ),
      $captions = $('.bicaption'),
      itemsCount = $items.length,
      slideshowtime,
      current;

    if (this.props.controls) {
      // initialize/bind the events
      initEvents();
    }

    // hide items except first
    $('.fadein div:gt(0)').css( 'opacity', 0);
    $('.bicaptions div:gt(0)').addClass('hidden');
    if (isSlideshowActive) {
      startSlideshow();
    }

    function initEvents () {
      // console.log('init Events!!!');

      var $controls = $( '#bicontrols' ),
        navigation = {
          $navPrev: $controls.find( 'span.biprev' ),
          $navNext: $controls.find( 'span.binext' ),
          $navPlayPause: $controls.find( 'span.bipause' )
        };

      navigation.$navPlayPause.on( 'click', function() {
        var $control = $( this );
        if( $control.hasClass( 'biplay' ) ) {
          $control.removeClass( 'biplay' ).addClass( 'bipause' );
          startSlideshow();
        }
        else {
          $control.removeClass( 'bipause' ).addClass( 'biplay' );
          stopSlideshow();
        }
      });

      navigation.$navPrev.on( 'click', function() {
        navigate( 'prev' );
        if( isSlideshowActive ) {
          startSlideshow();
        }
      } );
      navigation.$navNext.on( 'click', function() {
        navigate( 'next' );
        if( isSlideshowActive ) {
          startSlideshow();
        }
      } );
    }

    function startSlideshow () {
      isSlideshowActive = true;
      clearTimeout( slideshowtime );
      slideshowtime = setTimeout( function() {
        navigate( 'next' );
        startSlideshow();
      }, interval );
    }

    function stopSlideshow () {
      isSlideshowActive = false;
      clearTimeout( slideshowtime );
    }

    function navigate (direction) {
      console.log(direction);
      // current item
      var $currentItem = $items.eq( current );
      var $currentCaption = $('#bicaption-' + current);
      console.log(current);
      console.log($currentCaption);

      if( direction === 'next' ) {
        current = current < itemsCount - 1 ? ++current : 0;
      }
      else if( direction === 'prev' ) {
        current = current > 0 ? --current : itemsCount - 1;
      }

      // new item
      var $newItem = $items.eq( current );
      var $newCaption = $('#bicaption-' + current);
      // show / hide images
      $currentItem.css( 'opacity', 0 );
      $newItem.css( 'opacity', 1 );
      // show / hide captions
      $currentCaption.addClass('hidden');
      $newCaption.removeClass('hidden');
    }
  },
});

module.exports = BGSlideshow;
