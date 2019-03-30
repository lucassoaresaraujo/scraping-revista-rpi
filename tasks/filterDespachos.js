
function isCodigo350(despacho){
    return despacho.codigo == 350;
}

module.exports = (listaDespachos) => {
    return listaDespachos.filter(isCodigo350);
}