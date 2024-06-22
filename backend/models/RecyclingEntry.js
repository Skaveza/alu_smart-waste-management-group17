"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RecyclingEntry extends Model {
    static associate(models) {
      // Define association here
      RecyclingEntry.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  RecyclingEntry.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      material: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RecyclingEntry",
    }
  );

  return RecyclingEntry;
};
