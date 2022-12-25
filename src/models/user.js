import { DataTypes } from "sequelize";

export default ({ sequelize }) => {
  sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      post: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      underscored: true,
      tableName: "users",
    }
  );
};
