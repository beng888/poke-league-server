module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define('League', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 20] },
    },
  });

  League.associate = (models) => {
    League.hasMany(models.Team, {
      onDelete: 'cascade',
    });
  };

  return League;
};
