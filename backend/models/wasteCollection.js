"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WasteCollection extends Model {
    static associate(models) {
      // Define association here
      WasteCollection.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  WasteCollection.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "scheduled",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "WasteCollection",
    }
  );

  return WasteCollection;
};
