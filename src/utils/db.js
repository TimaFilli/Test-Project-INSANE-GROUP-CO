import { Sequelize } from "sequelize";
import models from "../models/index.js";

const sequelize = new Sequelize({
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  dialect: "sqlite",
  logging: false,
});

export default async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connnected!");

    await models({ sequelize });

    await sequelize.sync({ alter: true });

    return sequelize;
  } catch (error) {
    console.log("Database error: " + error.message);
  }
};
