const tasks = {
    extractData: require('./tasks/extractData.js'),
    downloadXml: require('./tasks/downloadXml.js'),
    xmlToObject: require('./tasks/xmlToObject.js')
}


async function start(){
    const data = await tasks.extractData();
    await tasks.downloadXml(data);
    //const objeto = tasks.xmlToObject(xml);
    console.log(data);
}

start();

// const listaDespachos = objeto.revista.despacho;
// listaDespachos.map(despacho => {
//     if (despacho.codigo == 350){
//         console.log(despacho.titulo);
//     }
// })