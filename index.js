const connection = require('./db/connection.js');

const tasks = {
    extractData: require('./tasks/extractData.js'),
    downloadXml: require('./tasks/downloadXml.js'),
    convertXmlToObject: require('./tasks/convertXmlToObject.js'),
    filterDespachos: require('./tasks/filterDespachos.js'),
    sanitizeData: require('./tasks/sanitizeData.js'),
    initializeDataBase: require('./tasks/initializeDataBase.js'),
}

async function start(){
    try {        
        const db = tasks.initializeDataBase(connection);    
        const data = await tasks.extractData();    
        const xml = await tasks.downloadXml(data);
        const objeto = tasks.convertXmlToObject(xml);
        const despachos = tasks.filterDespachos(objeto.revista.despacho);
        const dados = tasks.sanitizeData(despachos);        
        console.log(dados);
    } catch (error) {
        console.log(error.message);
    }
}

start();