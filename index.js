const tasks = {
    extractData: require('./tasks/extractData.js'),
    downloadXml: require('./tasks/downloadXml.js'),
    convertXmlToObject: require('./tasks/convertXmlToObject.js'),
    filterDespachos: require('./tasks/filterDespachos.js'),
    sanitizeData: require('./tasks/sanitizeData.js'),
}

async function start(){
    const data = await tasks.extractData();
    const xml = await tasks.downloadXml(data);
    const objeto = tasks.convertXmlToObject(xml);
    const despachos = tasks.filterDespachos(objeto.revista.despacho);
    const dados = tasks.sanitizeData(despachos);
    //console.log(despachos[despachos.length-1]['processo-contrato'].numero.$t);
    //console.log(despachos[despachos.length-1]['processo-contrato'].certificados);
    //console.log(despachos[despachos.length-1]['processo-contrato'].cedentes.cedente.endereco.pais.nome.$t);
    console.log(dados);
}

start();