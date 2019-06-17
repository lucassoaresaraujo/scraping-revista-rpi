module.exports = (sequelize, DataType) => {
  const Categoria = sequelize.define("categoria", {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataType.TEXT
    }
  });

  Categoria.associate = models => {
    Categoria.belongsToMany(models.certificado, {
      as: "Certificados",
      through: "categoria_certificado",
      foreignKey: "categoriaId"
    });
  };

  return Categoria;
};
