/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 30/09/2014
 * Time: 10:43
 */
var omniparser = require('node-omniparser'),

    fs = require('fs'),
    _ = require('underscore'),
    path = require('path');


var inputGraffleFilepath = path.dirname() + "/ux/flow.graffle",
    b3nchFilePath = path.dirname() + "/data/b3nch.json",
    captureStyle = false;


var graph = JSON.parse(omniparser.getGraph(inputGraffleFilepath, captureStyle));

//load json b3nch and re-write it

fs.readFile(b3nchFilePath, function (err, data) {
    if (err) {
        throw err;
    }
    var b3nch = JSON.parse(data);
    b3nch.nodes[0].data.nodes = graph.nodes;
    b3nch.nodes[0].data.relationships = graph.relationships;

    /*
    *  write the strings for the states
    * */
    var strings = {};
    _.each(b3nch.nodes[0].data.relationships,function( t ) {
        strings[t.data] = t.data;
    });

    var keys = _.keys(b3nch.nodes[1].data.index),
        newStrings = _.omit(strings,keys)

    //overwrite un-existing strings
    b3nch.nodes[1].data.index = _.extend(b3nch.nodes[1].data.index,newStrings);

    /*
    * write back to file
    * */
    fs.writeFile(b3nchFilePath, JSON.stringify(b3nch));
});


