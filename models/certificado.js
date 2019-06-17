module.exports = (sequelize, DataType) => {
  const Certificado = sequelize.define("certificado", {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: DataType.STRING(350)
    },
    naturezaDocumento: {
      type: DataType.STRING(255)
    },
    textoObjeto: {
      type: DataType.TEXT
    },
    descricaoMoeda: {
      type: DataType.TEXT
    },
    valorContrato: {
      type: DataType.TEXT
    },
    prazoContrato: {
      type: DataType.TEXT
    },
    prazoVigenciaPI: {
      type: DataType.TEXT
    },
    observacao: {
      type: DataType.TEXT
    }
  });

  Certificado.associate = models => {
    Certificado.belongsToMany(models.categoria, {
      as: "Categorias",
      through: "categoria_certificado",
      foreignKey: "certificadoId"
    });
  };

  return Certificado;
};
