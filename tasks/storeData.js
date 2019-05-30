const store = async content => {
    const sequelize = content.db.sequelize;
    const Revista = content.db.models.revista;
    const Cedente = content.db.models.cedente;
    const Cessionaria = content.db.models.cessionaria;
    const Processo = content.db.models.processo;
    const Certificado = content.db.models.certificado;

    const dados = content.data || [];
    let transaction;    
    try {
        transaction = await sequelize.transaction();
        for (let processo of dados) {
            let promisesCedentes = [];
            let cedentes = processo.cedentes || [];
            for (cedente of cedentes) {
                let promise = Cedente.findOrCreate({
                    where: cedente,
                    transaction: transaction
                });
                promisesCedentes.push(promise);
            };
            const listaCedentes = await Promise.all(promisesCedentes);
            console.log(listaCedentes);
        };        
        
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
    }
}

module.exports = store;