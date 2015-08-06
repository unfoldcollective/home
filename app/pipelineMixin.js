/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 05/08/2015
 * Time: 13:29
 */

'use strict';

let pipeline = require('./pipeline');


let pipelineMixin = {
    componentWillMount: function () {
        this.pipeline = pipeline;

        //this.pipeline.updatesStream
        //    .doAction(function(val){
        //        //console.log( 'pipelineMixin::() ', val);
        //        //this.setState({val: val});
        //    });
        let that = this;
        this.pipeline.updatesStream.subscribe(function(val){
            //console.log( 'pipelineMixin::() ', val);

            that.setState({val: val});
        });
    }
};

module.exports = pipelineMixin;
