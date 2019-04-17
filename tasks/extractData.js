const rp = require('request-promise');
const $ = require('cheerio');

const url = 'http://revistas.inpi.gov.br/rpi/';

async function getPageHtmlFile(){
    try {    
        pageHtml = await rp(url);
        return pageHtml;
    } catch (error) {        
        throw new Error("Não foi possivel extrair os dados");
    }
}

function getNumeroRevista(pageHtml){
    return parseInt( $('tr.warning', pageHtml)[0].children[1].children[0].data );
}

function getXmlUrl(pageHtml){
    return $('tr.warning', pageHtml)[0].children[7].children[1].children[3].attribs.href;
}

module.exports = async () => {
    const pageHtml = await getPageHtmlFile();
    return {
        xmlUrl: getXmlUrl(pageHtml),
        numeroRevista: getNumeroRevista(pageHtml)
    }
}