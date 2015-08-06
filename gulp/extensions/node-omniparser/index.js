var plist = require('simple-plist'),
    _ = require('underscore'),
    fs = require('fs'),
    assert = require('assert'),
    path = require('path');

var data,
    graphicsList,
    outputDebugPath;

function process(inputGraffleFilepath) {

    inputGraffleFilepath = inputGraffleFilepath;
    outputDebugPath = inputGraffleFilepath.split('.')[0] + '.debug.json';

    data = plist.readFileSync(inputGraffleFilepath);
    assert(data !== undefined, 'plist failed to load');

    graphicsList = data.GraphicsList;
    assert(graphicsList !== undefined, 'failed to get GraphicsList');
}

function graphicsListToGraph(shapesList,captureStyle) {
    var nodes = [],
        relationships = [],
        shapesList = shapesList.reverse(),
        captureStyle = captureStyle;

    var t_nodes = [],
        t_lines = [],
        t_labels = [];

    _.forEach(shapesList, function (shape, index) {
            if (shape.Class === 'LineGraphic') {
                t_lines.push(shape);
            } else if (shape.Class === 'ShapedGraphic' && shape.FitText === 'YES') {
                t_labels.push(shape);
            } else if (shape.Class === 'ShapedGraphic' && shape.FitText !== 'YES') {
                t_nodes.push(shape);
            } else {
                throw new Error("I don't know about this shape called " + shape.Class);
            }
        }
    );

    logToDebug(t_nodes);
//    return {};

    //add the nodes
    _.forEach(t_nodes, function (node, index) {
        nodes.push({"id": node.ID, "data": getNodeText(node.Text.Text)});
        if(captureStyle){
            //todo:decide how to capture the style
            var id = Math.random()*100000 >> 0;
            nodes.push({
                "id":id,//todo:maybe add unique ids
                "type":"style",
                "data":node.Style
            });
            relationships.push({
                "from": node.ID,
                "to": id,
                "data": "has_style"
            });

        }
    });
    //add the relationships
    _.forEach(t_labels, function (node, index) {
        var line = _.filter(t_lines, function (line) {
            return line.ID === node.Line.ID;
        });

        relationships.push({
            "from": line[0].Tail.ID,
            "to": line[0].Head.ID,
            "data": getNodeText(node.Text.Text)
        });
    });

    return {
        "nodes": nodes,
        "relationships": relationships
    };
}

function createCypherQuery(data, options) {
    var s = "create ",
        n;

    _.each(data.nodes, function (node, index) {
        s += '(n' + node.id + ':' + options.node_label + '{' + options.node_text + ':\'' + node.data + '\'}) ,'
    })
    _.each(data.relationships, function (rel, index) {
        s += '(n' + rel.from + ')-[:' + options.relationship_label + ']->(n' + rel.to + ') ,'
    })
    //remove trailing coma
    s = s.substr(0, s.length - 1);
    return s;
}

function getNodeText(t) {
    return t ? (t.match(/#(.*)#/g)[0]).replace(/#/g, '') : "";
}

function logToDebug(data) {
    fs.writeFile(outputDebugPath, JSON.stringify(data));
};

exports.getGraph = function (inputGraffleFilepath,captureStyle) {
    captureStyle = captureStyle || false;
    process(inputGraffleFilepath);
    return JSON.stringify(graphicsListToGraph(graphicsList,captureStyle));
};

exports.getRawJson = function (inputGraffleFilepath) {
    process(inputGraffleFilepath);
    return JSON.stringify(data);
};

exports.generateCypherQuery = function( inputGraffleFilepath , config ){
    process(inputGraffleFilepath);
    var graph = graphicsListToGraph(graphicsList);
     return createCypherQuery(graph,config);
};

