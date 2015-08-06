/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 05/08/2015
 * Time: 13:29
 */

'use strict';

let Rx = require('rx-lite'),
    _ = require('lodash'),
    M = require('gl-matrix');

/*
 *
 * data model
 * */

let model = Rx.Observable.just(
    {
        todos: []
    });


/*
 *
 * inputs
 * */
/*
 pointermove: a pointer moves, similar to touchmove or mousemove.
 pointerdown: a pointer is activated, or a device button held.
 pointerup: a pointer is deactivated, or a device button released.
 pointerover: a pointer has moved onto an element.
 pointerout: a pointer is no longer on an element it once was.
 pointerenter: a pointer enters the bounding box of an element.
 pointerleave: a pointer leaves the bounding box of an element.
 pointercancel: a pointer will no longer generate events.
 */

let pulse = Rx.Observable.interval(1000 / 60).startWith(0);

let windowResizes = Rx.Observable
    .fromEvent(window, 'resize')
    .map(function (e) {
        return {width: window.innerWidth, height: window.innerHeight};
    })
    .startWith({width: window.innerWidth, height: window.innerHeight});

let wind = [10, -10];
let windStream = Rx.Observable.just(wind).startWith([0, 0]);

let pointermoves = Rx.Observable
    .fromEvent(document, 'pointermove').map(function (p) {
        return {
            x: p.clientX
            , y: p.clientY
        };
    })
    .startWith({});

//let pointerdown = Rx.Observable.fromEvent(document, 'pointerdown');
//let pointerup = Rx.Observable.fromEvent(document, 'pointerup');
//pointermoves = pointermoves.takeWhile(pointerdown).takeUntil(pointerup);


let comb = Rx.Observable.combineLatest(windStream, pointermoves, pulse, function (_windStream, _pointermoves, _pulse) {
    return {w: [10, -10 + Math.random() * 10 >> 0], p: _pointermoves};
    //return {w: [0, 4], p: _pointermoves};
    //return {w: _windStream, p: _pointermoves};
});

comb = comb
    .scan([], function (acc, next) {
        acc = _.chain(acc)
            .takeRight(50)
            .map(function (p) {
                return {x: p.x + next.w[0], y: p.y + next.w[1]};
            })
            .value();


        acc.push(next.p);
        return acc;
    })
    .startWith([]);


//let movesOnRightSide = pointermoves
//    .filter(function(point){
//         return point.x > document.innerWidth / 2;
//    });


//pointermoves.subscribe(function (val) {
//    console.log('pipeline::() ', val);
//});

/*
 *
 * state
 * */





/*
 *
 * update
 * */

let updatesStream = Rx.Observable
    .combineLatest(
    model,
    windowResizes,
    comb,
    function (_model,
              _windowResizes,
              _comb) {

        let updatedState = {
            _model: _model,
            _pointerMoves: _comb,
            _windowResizes: _windowResizes
            //,
            //_pulse: _pulse
        };
        return updatedState;
    });

//.scan([], function (acc, next) {
//    acc.push(next);
//
//    return acc;
//});

/*
 *
 * render
 * */


let pipeline = {
    updatesStream: updatesStream
};

module.exports = pipeline;
