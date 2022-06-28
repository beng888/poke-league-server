module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define('League', {
    owner: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 20] },
      unique: {
        args: true,
        msg: 'title already taken',
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 50] },
    },
    terrain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    requiredSlots: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { max: 10 },
    },
    totalStatsLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 175, max: 30600 },
    },
  });

  League.associate = (models) => {
    League.hasMany(models.Team, {
      onDelete: 'cascade',
    });
  };

  return League;
};
