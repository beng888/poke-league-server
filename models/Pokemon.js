module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define('Pokemon', {
    trainer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: 3 },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return Pokemon;
};
