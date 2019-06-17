module.exports = (sequelize, DataType) => {
    const Revista = sequelize.define("revista", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        numeroRevista: {
            type: DataType.STRING(10),            
        },
        dataPublicacao: {
            type: DataType.DATEONLY,            
        },
        link: {
            type: DataType.STRING
        }
    });

    Revista.associate = (models) => {
        Revista.hasMany(models.processo, {foreignKey : 'revistaId'});
    }

    return Revista;
};