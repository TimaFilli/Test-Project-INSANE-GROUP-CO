import { DataTypes } from "sequelize";

export default async ({ sequelize }) => {
  sequelize.define(
    "Post",
    {
      postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      created_at: "createdAt",
      updated_at: "updatedAt",
      underscored: true,
      tableName: "posts",
    }
  );
};
