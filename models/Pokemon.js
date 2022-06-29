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
      type: DataTypes.TEXT,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue('details'));
      },
      set: function (value) {
        return this.setDataValue('details', JSON.stringify(value));
      },
    },
    // details: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    // },
  });

  return Pokemon;
};
