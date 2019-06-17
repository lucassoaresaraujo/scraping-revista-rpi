module.exports = connection => {
  const db = connection();

  db.sequelize.sync().done(() => {
    console.log(`DB Funcionando`);
  });

  return db;
};
