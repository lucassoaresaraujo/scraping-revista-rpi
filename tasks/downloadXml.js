const request = require("request");
const fetch = require("node-fetch");
const fs = require("fs");
const AdmZip = require("adm-zip");

async function downloadZip(data) {
  const file = fs.createWriteStream("./arquivo.zip");
  var res = await fetch(data.xmlUrl);
  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream("./arquivo.zip");
    res.body.pipe(fileStream);
    res.body.on("error", err => {
      reject(err);
    });
    fileStream.on("finish", function() {
      resolve();
    });
  });
}

async function unzipFile(numeroRevista) {
  const zip = new AdmZip("./arquivo.zip");
  zip.extractEntryTo(
    `Contratos_${numeroRevista}.xml`,
    "./arquivo",
    false,
    true
  );
}

function getXml(numeroRevista) {
  const data = fs.readFileSync(
    `./arquivo/Contratos_${numeroRevista}.xml`,
    "utf-8"
  );
  return data.toString();
}

module.exports = async data => {
  await downloadZip(data);
  await unzipFile(data.numeroRevista);
  return getXml(data.numeroRevista);
};
