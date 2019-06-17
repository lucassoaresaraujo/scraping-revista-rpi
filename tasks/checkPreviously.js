const robot = async content => {
  const Revista = content.db.models.revista;
  const count = await Revista.count({
    where: {
      numeroRevista: content.data.numeroRevista
    }
  });
  return count > 0;
};

module.exports = robot;
