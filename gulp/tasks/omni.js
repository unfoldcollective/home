/**
 * Created with IntelliJ IDEA.
 * User: javierabanses
 * Date: 26/03/2015
 * Time: 13:51
 */


var omniParser = require('omnigraffle-parser')
    , toD3 = require('b3nchJsonTod3GraphJson')
    , fs = require('fs')
    , path = require('path')
    , _ = require('lodash');


/*
 *
 * model
 * */
var model = {
    inputGrafflePath: 'react-lazy-loader'
    //inputGrafflePath: 'groups'
    , outputGrafflePath: 'react-lazy-loader'
    //,outputGrafflePath: 'groups'
    , tempDir: './app/tmp'
    , sourceDirectory: './app/design/'
    , destinationDirectory: './build/data'
}

var test = {
    inputGrafflePath: 'test3'
    , outputGrafflePath: 'test'
    , tempDir: './app/tmp'
    , sourceDirectory: './app/data/testData/'
    , destinationDirectory: './app/data/testData'
}


var paths = {
    inputGraffles: './app/design'
    , destinationDirectory: './build/data'
    , imageDestinationDirectory:'./build/refs'
};


/*
 *
 *
 * */

fs.readdir(paths.inputGraffles, function (error, res) {
    _.each(res, function (graffle) {
        if (graffle.match(/\.graffle$/)) {
            var p =  path.join(paths.inputGraffles, graffle);
            var stats = fs.lstatSync(p);
            //if(!stats.isDirectory()){
                var name = graffle.split('.graffle')[0];
                var graph = omniParser.toGraph(p, {}, true, {}, paths.imageDestinationDirectory+'/'+name);

                fs.writeFile(path.join('./', paths.destinationDirectory, name + '.json'), JSON.stringify(graph));
            //}
        }

    });

})


//var source = model;
//
//var graph = omniParser.toGraph(source.sourceDirectory + source.inputGrafflePath + '.graffle', {}, true)
//fs.writeFile('./app/tmp/graph.tmp.json', JSON.stringify(graph))
////graph = toD3.toD3GraphJson(JSON.stringify(graph))
////console.log('::() ', graph );
//
//
//fs.writeFile(path.join('./', source.destinationDirectory, source.outputGrafflePath + '.json'), JSON.stringify(graph))