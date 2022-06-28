module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define('Pokemon', {
    trainer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Pokemon;
};
