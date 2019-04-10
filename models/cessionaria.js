module.exports = (sequelize, DataType) => {
    const Cessionaria = sequelize.define("cessionaria", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING(350),            
        },
        pais: {
            type: DataType.STRING(255),            
        },
        setor: {
            type: DataType.STRING(350)
        }
    });

    Cessionaria.associate = (models) => { }

    return Cessionaria;
};