module.exports = (sequelize, DataType) => {
  const Processo = sequelize.define("processo", {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    numeroProcesso: {
      type: DataType.STRING(350)
    },
    dataProtocolo: {
      type: DataType.DATEONLY
    },
    codigoDespacho: {
      type: DataType.STRING
    },
    tituloDespacho: {
      type: DataType.STRING
    }
  });

  Processo.associate = models => {
    Processo.belongsTo(models.revista, { foreignKey: "revistaId" });
    Processo.belongsToMany(models.cedente, {
      as: "Cedentes",
      through: "processo_cedente"
    });
    Processo.belongsToMany(models.cessionaria, {
      as: "Cessionarias",
      through: "processo_cessionaria"
    });
    Processo.hasMany(models.certificado);
  };

  return Processo;
};
