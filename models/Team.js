module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    trainer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Team;
};
