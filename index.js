const tasks = {
    extractData: require('./tasks/extractData.js'),
    downloadXml: require('./tasks/downloadXml.js'),
    convertXmlToObject: require('./tasks/convertXmlToObject.js'),
    filterDespachos: require('./tasks/filterDespachos.js'),
}

async function start(){
    const data = await tasks.extractData();
    const xml = await tasks.downloadXml(data);
    const objeto = tasks.convertXmlToObject(xml);
    const despachos = tasks.filterDespachos(objeto.revista.despacho);
    console.log(despachos);
    //console.log(despachos.length);
}

start();