module.exports = (sequelize, DataType) => {
    const Processo = sequelize.define("processo", {
        id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        numeroProcesso: {
            type: DataType.STRING(350),            
        },
        dataProtocolo: {
            type: DataType.DATEONLY,            
        },
        codigoDespacho: {
            type: DataType.STRING
        },
        tituloDespacho: {
            type: DataType.STRING
        }
    });

    Processo.associate = (models) => { 
        Processo.belongsTo(models.revista);
        Processo.hasMany(models.cedente);
        Processo.hasMany(models.cessionaria);
        Processo.hasMany(models.certificado);
    }

    return Processo;
};