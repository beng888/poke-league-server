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
    totalStats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slots: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue('slots'));
      },
      set: function (value) {
        return this.setDataValue('slots', JSON.stringify(value));
      },
    },
    // slots: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    // },
  });

  return Team;
};
