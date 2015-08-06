///**
// * Created with IntelliJ IDEA.
// * User: javierabanses
// * Date: 08/10/2014
// * Time: 16:06
// */
//

/*
 *
 *
 * node gulp/extensions/sketch/sketch-utils.js -f containerstudy  -v javi_a --fsm fsm1

 * */

var fs = require('fs-extra'),
    path = require('path'),
    parseArgs = require('minimist'),
    jsonfile = require('jsonfile'),
    _ = require('lodash'),
    mkdirp = require('mkdirp');


var sketchPluginFilePath = "/Users/javierabanses/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Application Support/com.bohemiancoding.sketch3/Plugins/b3nchData",
    sketchTemplatesPath = "./screens-mobile-0.1.0.sketch",
    templatepluginFilePath = "./graph_to_arboards.sketchplugin";


function generatePlugin(name, data) {

    //1.load the json file


    //2. load the sketch.plugin


    //3. append the json to the end


    //4. save in the sketch's plugin folder

    console.log('sketch-utils::generatePlugin() ', name);

    fs.copy(path.join(__dirname, templatepluginFilePath), path.join(sketchPluginFilePath, name + '.sketchplugin'), function (err) {
        if (err) {
            throw err;
        }
        fs.appendFile(path.join(sketchPluginFilePath, name + '.sketchplugin'), data + '; generate(false);   ', function (err) {
            if (err) return;
        })

        console.log("Plugin generated");
    });
}


module.exports = {
    generatePlugin: generatePlugin
}

var argv = require('minimist')(process.argv.slice(2));

if (argv) {
    if (argv['f'] && argv['v'] && argv['fsm']) {
        var pathFromRoot = path.join(process.cwd(), 'build', 'data', argv['f']);
        jsonfile.readFile(pathFromRoot + '.json', function (err, obj) {
            if (err) {
                throw new Error('file not found at ', pathFromRoot);
            } else {
                //console.dir(obj);

                if (argv['fsm']) {
                    //find fsm node of name = argv['fsm']
                    var fsm = _.find(obj.nodes, function (n) {
                        return n.label === 'FSM' && n.data.name === argv['fsm']
                    })
                    if (fsm) {
                        //console.log('sketch-utils::() found fsm of name ', argv['fsm']);
                        var PART_OF_rels = _.filter(obj.relationships, function (r) {
                            return r.type === 'PART_OF' && r.to === fsm.uuid;
                        })

                        //console.log( 'sketch-utils::() PART_OF_rels = ', PART_OF_rels);

                        var states = _.chain(PART_OF_rels)
                            .map(function (r) {
                                return _.find(obj.nodes, function (n) {
                                    //console.log( 'sketch-utils::() n = ', r);
                                    return n.uuid === r.from;
                                })
                            })
                            .value();


                        var allTransitions = [];
                        _.each(states, function(state){

                            var rels = _.filter(obj.relationships, function(r){
                                 return r.from === state.uuid && r.type === 'TRANSITIONS_TO';
                            })

                            allTransitions = allTransitions.concat(rels);
                        });

                        //console.log('sketch-utils::() states = ', states);

                        var data = {
                            nodes: states,
                            relationships: allTransitions
                        };


                        var name = argv['f'] + '_fsm_' + argv['v'];
                        generatePlugin(name, JSON.stringify(data));


                        //make a directory for the sketch file and copy it there //sketchTemplatesPath
                        var sketchFileDir = path.join(process.cwd(), 'app', 'design', '___sketch', argv['f'], argv['v']);
                        mkdirp(sketchFileDir, function (err) {
                            if (err) {
                                throw new Error('couldn\'t create directory at ', sketchFileDir);
                            } else {
                                console.log('folder for sketch file created at ', sketchFileDir);
                                fs.copy(path.join(__dirname, sketchTemplatesPath), path.join(sketchFileDir, argv['v'] + '.sketch'), function (err) {
                                    console.log('sketch-utils::() error ', path.join(__dirname, sketchTemplatesPath),path.join(sketchFileDir, argv['v'] + '.sketch'));
                                }, function (success) {
                                    console.log('sketch file created at ', sketchFileDir);
                                });


                            }
                            // path was created unless there was error

                        });

                        //make a directory for the images if it doen't exixt

                        var dir = path.join(process.cwd(), 'build', 'refs', argv['f'], argv['v']);
                        mkdirp(dir, function (err) {
                            if (err) {
                                throw new Error('couldn\'t create directory');
                            } else {
                                console.log('folder for assets created at ', dir);
                            }
                            // path was created unless there was error

                        });


                    } else {
                        throw  new Error('no fsm of name found ' + argv['fsm'])
                    }
                }


            }
        });
    } else {

        console.log('sketch-utils::() plase suply a json file -f -v --fsm');
        process.exit(0);
    }
}




