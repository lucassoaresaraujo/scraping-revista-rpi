const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

const config = require("./config.js");

let db = null;

module.exports = () => {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: "localhost",
      dialect: "postgres",
      operatorsAliases: false,
      logging: false,
      define: {
        underscored: true,
        underscoredAll: true,
        paranoid: true,
        freezeTableName: true
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    models: {}
  };

  const dir = path.join(__dirname, "../models");
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
  });

  Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
  });

  return db;
};
