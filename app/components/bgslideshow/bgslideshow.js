'use strict';
var React = require('react'),
    _ = require('lodash'),
    $ = require('jquery');


require('./bgslideshow.less');

var BGSlideshow = React.createClass({
  render: function() {
    let slideshowImages = _.map(this.props.images, function (item, index)
      {return (
        <div id={'bi-' + index} style={{backgroundImage: 'url(' + item.url + ')'}}></div>
        ); }, this
    );
    return (
      <div className='bgslideshow'>
        <div className="fadein">
          {slideshowImages}
        </div>
          {this.props.controls ? (
            <div id="bicontrols" className="bicontrols">
              <span className="biprev">prev</span>
              <span className="bipause">pause</span>
              <span className="binext">next</span>
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
      itemsCount = $items.length,
      slideshowtime,
      current;

    if (this.props.controls) {
      // initialize/bind the events
      initEvents();
    }

    // show first item
    $items.eq( current ).css( 'opacity', 1 );
    if (isSlideshowActive) {
      startSlideshow();
    }

    function initEvents () {
      console.log('init Events!!!');

      var $controls = $( '#bicontrols' ),
        navigation = {
          $navPrev: $controls.find( 'span.biprev' ),
          $navNext: $controls.find( 'span.binext' ),
          $navPlayPause: $controls.find( 'span.bipause' )
        };

      navigation.$navPlayPause.on( 'click', function() {
        console.log('playpause click!!!');
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
      // $('.fadein :first-child').fadeOut(duration);

      // if (direction === 'next') {
      //   $('.fadein :first-child').next('div').fadeIn(duration)
      //     .end().appendTo('.fadein');
      // }
      // else if (direction === 'prev') {
      //   $('.fadein :last-child').fadeIn(duration)
      //     .prependTo('.fadein');
      // }

      // current item
      var $currentItem = $items.eq( current );

      if( direction === 'next' ) {
        current = current < itemsCount - 1 ? ++current : 0;
      }
      else if( direction === 'prev' ) {
        current = current > 0 ? --current : itemsCount - 1;
      }

      // new item
      var $newItem = $items.eq( current );
      // show / hide items
      $currentItem.css( 'opacity', 0 );
      $newItem.css( 'opacity', 1 );
    }
  },
});

module.exports = BGSlideshow;
