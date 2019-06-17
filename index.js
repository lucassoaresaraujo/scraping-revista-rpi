const connection = require("./db/connection.js");
const moment = require("moment");

const tasks = {
  extractData: require("./tasks/extractData.js"),
  downloadXml: require("./tasks/downloadXml.js"),
  convertXmlToObject: require("./tasks/convertXmlToObject.js"),
  filterDespachos: require("./tasks/filterDespachos.js"),
  sanitizeData: require("./tasks/sanitizeData.js"),
  initializeDataBase: require("./tasks/initializeDataBase.js"),
  checkPreviously: require("./tasks/checkPreviously.js"),
  storeData: require("./tasks/storeData.js"),
  createExcelFile: require("./tasks/createExcelFile.js"),
  sendEmail: require("./tasks/sendEmail.js")
};

async function start() {
  try {
    const db = tasks.initializeDataBase(connection);
    const data = await tasks.extractData();
    const isExistingRecord = await tasks.checkPreviously({
      db: db,
      data: data
    });
    if (!isExistingRecord) {
      const xml = await tasks.downloadXml(data);
      const objeto = tasks.convertXmlToObject(xml);
      const despachos = tasks.filterDespachos(objeto.revista.despacho);
      const processos = tasks.sanitizeData(despachos);
      await tasks.storeData({
        db: db,
        processos: processos,
        revista: {
          numeroRevista: objeto.revista.numero,
          dataPublicacao: moment(objeto.revista.dataPublicacao, "DD/MM/YYYY")
        }
      });
      tasks.createExcelFile(processos);
      await tasks.sendEmail(data);
      console.log(`Finalizado revista ${data.numeroRevista}`);
    }
    console.log(`Revista ${data.numeroRevista} já foi inserida anteriormente`);
  } catch (error) {
    console.log(`Erro ao inserir revista ${data.numeroRevista}`);
    console.log(error);
  }
}

start();
