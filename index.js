const connection = require('./db/connection.js');

const tasks = {
    extractData: require('./tasks/extractData.js'),
    downloadXml: require('./tasks/downloadXml.js'),
    convertXmlToObject: require('./tasks/convertXmlToObject.js'),
    filterDespachos: require('./tasks/filterDespachos.js'),
    sanitizeData: require('./tasks/sanitizeData.js'),
    initializeDataBase: require('./tasks/initializeDataBase.js'),
    checkPreviously: require('./tasks/checkPreviously.js'),
    storeData: require('./tasks/storeData.js') 
}

async function start(){
    try {        
        const db = tasks.initializeDataBase(connection);
        const data = await tasks.extractData();
        const isExistingRecord = await tasks.checkPreviously({db: db, data:data});
        console.log(isExistingRecord);
        if (!isExistingRecord) {
            const xml = await tasks.downloadXml(data);
            const objeto = tasks.convertXmlToObject(xml);
            const despachos = tasks.filterDespachos(objeto.revista.despacho);
            const dados = tasks.sanitizeData(despachos);
            await tasks.storeData({db: db, data: dados});
            console.log(dados);
        }
    } catch (error) {
        //console.log(error.message);
    }
}

start();