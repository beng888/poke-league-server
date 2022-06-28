module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    trainer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 20] },
      unique: {
        args: true,
        msg: 'team name already taken',
      },
    },
    slots: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return Team;
};
