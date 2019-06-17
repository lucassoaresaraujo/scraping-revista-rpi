const xl = require("excel4node");

const getNome = cedentes => {
  return cedentes.map(cedente => cedente.nome);
};

const getPais = itens => {
  return itens.map(item => item.pais);
};

const getSetor = itens => {
  return itens.map(item => item.setor);
};

module.exports = content => {
  const processos = content || [];
  var wb = new xl.Workbook();
  var ws = wb.addWorksheet("Pasta 01");

  var styleHeader = wb.createStyle({
    font: {
      color: "#000000",
      bold: true,
      size: 12
    }
  });

  var style = wb.createStyle({
    font: {
      color: "#000000",
      size: 12
    }
  });

  ws.cell(1, 1)
    .string("Nº PROCESSO")
    .style(styleHeader);

  ws.cell(1, 2)
    .string("CÓDIGO")
    .style(styleHeader);

  ws.cell(1, 3)
    .string("CERTIFICADO DE AVERBAÇÃO/REGISTRO")
    .style(styleHeader);

  ws.cell(1, 4)
    .string("DATA PROTOCOLO")
    .style(styleHeader);

  ws.cell(1, 5)
    .string("CEDENTE")
    .style(styleHeader);

  ws.cell(1, 6)
    .string("PAÍS CEDENTE")
    .style(styleHeader);

  ws.cell(1, 7)
    .string("CESSIONÁRIA")
    .style(styleHeader);

  ws.cell(1, 8)
    .string("PAÍS CESSIONÁRIA")
    .style(styleHeader);

  ws.cell(1, 9)
    .string("SETOR")
    .style(styleHeader);

  ws.cell(1, 10)
    .string("NATUREZA DO DOCUMENTO")
    .style(styleHeader);

  ws.cell(1, 11)
    .string("MODALIDADE CONTRATUAL")
    .style(styleHeader);

  ws.cell(1, 12)
    .string("OBJETO")
    .style(styleHeader);

  ws.cell(1, 13)
    .string("MOEDA")
    .style(styleHeader);

  ws.cell(1, 14)
    .string("PRAZO DE VIGÊNCIA PROPRIEDADE INDUSTRIAL")
    .style(styleHeader);

  ws.cell(1, 15)
    .string("VALOR CONTRATO")
    .style(styleHeader);

  ws.cell(1, 16)
    .string("FORMA PAGAMENTO")
    .style(styleHeader);

  ws.cell(1, 17)
    .string("PRAZO VIGÊNCIA CONTRATO")
    .style(styleHeader);

  ws.cell(1, 18)
    .string("OBSERVAÇÕES")
    .style(styleHeader);

  for (let i = 0; i < processos.length; i++) {
    let linha = i + 2;
    ws.cell(linha, 1)
      .string(processos[i].numeroProcesso)
      .style(style);

    ws.cell(linha, 2)
      .string(`${processos[i].codigoDespacho} - ${processos[i].tituloDespacho}`)
      .style(style);

    ws.cell(linha, 3)
      .string(processos[i].certificado[0].numero)
      .style(style);

    ws.cell(linha, 4)
      .string(processos[i].dataProtocolo.format("DD/MM/YYYY"))
      .style(style);

    ws.cell(linha, 5)
      .string(getNome(processos[i].cedentes))
      .style(style);

    ws.cell(linha, 6)
      .string(getPais(processos[i].cedentes))
      .style(style);

    ws.cell(linha, 7)
      .string(getNome(processos[i].cessionarias))
      .style(style);

    ws.cell(linha, 8)
      .string(getPais(processos[i].cessionarias))
      .style(style);

    ws.cell(linha, 9)
      .string(getSetor(processos[i].cessionarias))
      .style(style);

    ws.cell(linha, 10)
      .string(processos[i].certificado[0].naturezaDocumento)
      .style(style);

    ws.cell(linha, 11)
      .string(processos[i].certificado[0].siglaCategoria)
      .style(style);

    ws.cell(linha, 12)
      .string(processos[i].certificado[0].textoObjeto)
      .style(style);

    ws.cell(linha, 13)
      .string(processos[i].certificado[0].descricaoMoeda)
      .style(style);

    ws.cell(linha, 14)
      .string(processos[i].certificado[0].prazoVigenciaPI)
      .style(style);

    ws.cell(linha, 15)
      .string(processos[i].certificado[0].valorContrato)
      .style(style);

    ws.cell(linha, 16)
      .string(processos[i].certificado[0].formaPagamento)
      .style(style);

    ws.cell(linha, 17)
      .string(processos[i].certificado[0].prazoContrato)
      .style(style);

    ws.cell(linha, 18)
      .string(processos[i].certificado[0].observacao)
      .style(style);
  }

  wb.write("arquivo/excel.xlsx");
};
