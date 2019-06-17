const store = async content => {
  const sequelize = content.db.sequelize;
  const Revista = content.db.models.revista;
  const Cedente = content.db.models.cedente;
  const Cessionaria = content.db.models.cessionaria;
  const Categoria = content.db.models.categoria;
  const Certificado = content.db.models.certificado;

  const processos = content.processos || [];
  const revista = content.revista;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const revistaSalva = await Revista.create(revista, {
      transaction: transaction
    });
    for (let processo of processos) {
      const processoSalvo = await revistaSalva.createProcesso(processo, {
        transaction: transaction
      });

      let certificados = processo.certificado || [];
      let promisesCategoria = [];
      let resultPromisesCategoria = [];
      for (certificado of certificados) {
        let categorias = certificado.siglaCategoria.split(";");

        for (categoria in categorias) {
          let promiseCategoria = Categoria.findOrCreate({
            where: { descricao: certificado.siglaCategoria },
            transaction: transaction
          });
          promisesCategoria.push(promiseCategoria);
        }

        resultPromisesCategoria = await Promise.all(promisesCategoria);
        let categoriasSalvas = resultPromisesCategoria.map(
          resultCategoria => resultCategoria[0].id
        );

        let certificadoSalvo = await Certificado.create(certificado, {
          transaction: transaction
        });

        certificadoSalvo.setCategorias(categoriasSalvas, {
          transaction: transaction
        });

        await processoSalvo.addCertificado(certificadoSalvo, {
          transaction: transaction
        });
      }

      let promisesCedentes = [];
      let listaCedentes = [];
      let cedentes = processo.cedentes || [];

      for (cedente of cedentes) {
        let promise = Cedente.findOrCreate({
          where: cedente,
          transaction: transaction
        });
        promisesCedentes.push(promise);
      }

      listaCedentes = await Promise.all(promisesCedentes);
      let idsCedentes = listaCedentes.map(arrayCedente => arrayCedente[0].id);
      await processoSalvo.setCedentes(idsCedentes, {
        transaction: transaction
      });

      let promiseCessionarias = [];
      let listaCessionarias = [];
      let cessionarias = processo.cessionarias || [];

      for (cessionaria of cessionarias) {
        let promise = Cessionaria.findOrCreate({
          where: cessionaria,
          transaction: transaction
        });
        promiseCessionarias.push(promise);
      }

      listaCessionarias = await Promise.all(promiseCessionarias);
      let idsCessionarias = listaCessionarias.map(
        arrayCessionaria => arrayCessionaria[0].id
      );

      await processoSalvo.setCessionarias(idsCessionarias, {
        transaction: transaction
      });
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.log(error);
  }
};

module.exports = store;
