function sanitizeCedente(itemCedente){
    return {
        nome: itemCedente.nomeCompleto != undefined ? itemCedente.nomeCompleto.$t : null,
        pais: itemCedente.endereco != undefined ? itemCedente.endereco.pais.nome.$t : null
    }
}

function sanitizeCessionaria(itemCessionaria){
    return {
        nome: itemCessionaria.nomeCompleto.$t,
        pais: itemCessionaria.endereco.pais.nome.$t,
        setor: itemCessionaria.setor.$t
    }
}

function sanitizePrazoVigencia(item){    
    if (item.certificado.prazoVigenciaPI != undefined ){
        return item.certificado.prazoVigenciaPI.$t;
    } else {
        return null;
    }
}

function sanitizeDescricaoMoeda(item){
    if (item.certificado.descricaoMoeda != undefined){
        return item.certificado.descricaoMoeda.$t
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
        descricaoMoeda: sanitizeDescricaoMoeda(itemCertificado),
        valorContrato: itemCertificado.certificado.valorContrato.$t,
        prazoContrato: itemCertificado.certificado.prazoContrato.$t,
        prazoVigenciaPI: sanitizePrazoVigencia(itemCertificado),
        observacao: sanitizeObservarcao(itemCertificado),
    }
}

function getCedente(cedentes){
    let cedente = [];
    if (Array.isArray(cedentes.cedente)){
        cedente = cedentes.cedente.map(item => sanitizeCedente(item));
    } else {
        cedente.push(sanitizeCedente(cedentes.cedente));
    }
    return cedente;
}

function getCessionaria(cessionarias){
    let cessionaria = [];
    if (Array.isArray(cessionarias.cessionaria)){
        cessionaria = cessionarias.cessionaria.map(item => sanitizeCessionaria(item));
    } else {
        cessionaria.push(sanitizeCessionaria(cessionarias.cessionaria));
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
    
    const cedentes = getCedente(item['processo-contrato'].cedentes);
    const cessionarias = getCessionaria(item['processo-contrato'].cessionarias);
    const certificado = getCertificado(item['processo-contrato'].certificados);

    return {
        numeroProcesso: item['processo-contrato'].numero.$t,
        dataProtocolo: item['processo-contrato'].dataProtocolo.$t,
        codigoDespacho: item.codigo,
        tituloDespacho: item.titulo,
        cedentes: cedentes,
        cessionarias: cessionarias,
        certificado: certificado,
    }
}

module.exports = (despachos) => {
    return despachos.map(itemDespacho => sanitizeData(itemDespacho));
}