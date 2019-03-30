const parser = require('xml2json');

function getObject(xml){
    const json = parser.toJson(xml);
    const object = JSON.parse(json);
    return object;
}

module.exports = getObject;