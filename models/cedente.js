module.exports = (sequelize, DataType) => {
    const Cedente = sequelize.define("cedente", {
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
        }    
    });

    Cedente.associate = (models) => { }

    return Cedente;
};