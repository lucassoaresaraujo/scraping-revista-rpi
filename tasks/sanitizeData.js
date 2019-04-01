function sanitizeCedente(itemCedente){
    return {
        nome: itemCedente.cedente.nomeCompleto.$t,
        pais: itemCedente.cedente.endereco.pais.nome.$t
    }
}

function sanitizeCessionaria(itemCessionaria){
    return {
        nome: itemCessionaria.cessionaria.nomeCompleto.$t,
        pais: itemCessionaria.cessionaria.endereco.pais.nome.$t,
        setor: itemCessionaria.cessionaria.setor.$t
    }
}

function sanitizePrazoVigencia(item){
    if (item.certificado.prazoVigenciaPI != undefined ){
        return item.certificado.prazoVigenciaPI.$t;
    } else {
        return null;
    }
}

function sanitizeObservarcao(item){
    if (item.certificado.observacao != undefined){
        return item.certificado.observacao.$t;
    } else {
        return null;
    }
}

function sanitizeCertificado(itemCertificado){
    return {
        numero: itemCertificado.certificado.numero.$t,
        naturezaDocumento: itemCertificado.certificado.naturezaDocumento.$t,
        textoObjeto: itemCertificado.certificado.textoObjeto.$t,
        siglaCategoria: itemCertificado.certificado.siglaCategoria.$t,
        descricaoMoeda: itemCertificado.certificado.descricaoMoeda.$t,
        valorContrato: itemCertificado.certificado.valorContrato.$t,
        prazoContrato: itemCertificado.certificado.prazoContrato.$t,
        prazoVigenciaPI: sanitizePrazoVigencia(itemCertificado),
        observacao: sanitizeObservarcao(itemCertificado),
    }
}

function getCedente(cedentes){
    const cedente = [];
    if (Array.isArray(cedentes)){
        cedente = cedentes.map(item => sanitizeCedente(item));
    } else {
        cedente.push(sanitizeCedente(cedentes));
    }
    return cedente;
}

function getCessionaria(cessionarias){
    const cessionaria = [];
    if (Array.isArray(cessionarias)){
        cessionaria = cessionarias.map(item => sanitizeCessionaria(item));
    } else {
        cessionaria.push(sanitizeCessionaria(cessionarias));
    }
    return cessionaria;
}

function getCertificado(certificados){
    let certificado = [];
    if (Array.isArray(certificados)){
        certificado = certificados.map(item => sanitizeCertificado(item));
    } else {
        certificado.push(sanitizeCertificado(certificados));
    }
    return certificado;
}

function sanitizeData(item) {
    
    const cedente = getCedente(item['processo-contrato'].cedentes);
    const cessionaria = getCessionaria(item['processo-contrato'].cessionarias);
    const certificado = getCertificado(item['processo-contrato'].certificados);

    return {
        numeroProcesso: item['processo-contrato'].numero.$t,
        dataProtocolo: item['processo-contrato'].dataProtocolo.$t,
        codigoDespacho: item.codigo,
        tituloDespacho: item.titulo,
        cedente: cedente,
        cessionaria: cessionaria,
        certificado: certificado,
    }
}

module.exports = (despachos) => {
    return despachos.map(itemDespacho => sanitizeData(itemDespacho));
}