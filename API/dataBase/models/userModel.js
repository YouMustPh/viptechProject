const { saltos } = require("../../config.json");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: false,
      hooks: {
        beforeValidate: (user) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, saltos);
          }
        },
      },
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      scopes: {
        login: {
          attributes: ["id", "password"],
        },
      },
    }
  );
  return User;
};
