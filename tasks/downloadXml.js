const request = require('request');
const fetch = require('node-fetch');
const fs = require('fs');
const AdmZip = require('adm-zip');

async function downloadZip(data){
    const file = fs.createWriteStream("./arquivo.zip");
    var res = await fetch(data.xmlUrl);
    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream("./arquivo.zip");
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
          reject(err);
        });
        fileStream.on("finish", function() {
          resolve();
        });
    });
}


// async function downloadZip(data){
//     const file = fs.createWriteStream("./arquivo.zip");
//     var req = request(
//         {
//             method: 'GET',
//             uri: data.xmlUrl
//         }
//     );
//     req.pipe(file);
//     req.on('end', () => {
//         unzipFile(data.numeroRevista);
//     });
// }

async function unzipFile(numeroRevista){
    const zip = new AdmZip("./arquivo.zip");
    zip.extractEntryTo(`Contratos_${numeroRevista}.xml`, "./arquivo", false, true);
}

module.exports = async (data) => {
    await downloadZip(data);
    await unzipFile(data.numeroRevista);
};