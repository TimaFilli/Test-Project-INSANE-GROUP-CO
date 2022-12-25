import fileUpload from "express-fileupload";
import express from "express";
import path from "path";
import "./config.js";
import UserRouter from "./routes/user.js";
import PostRouter from "./routes/post.js";

import database from "./utils/db.js";
import mockData from "./mock.js";

import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import loggerMiddleware from "./middlewares/logger.js";

const PORT = process.env.PORT || 5000;

!(async function () {
  const app = express();

  const db = await database();
  await mockData({ sequelize: db });

  app.use(express.static(path.join(process.cwd(), "src", "public")));
  app.use(express.json());
  app.use(fileUpload());
  app.use((req, res, next) => {
    req.models = db.models;
    next();
  });

  app.use(UserRouter);
  app.use(PostRouter);

  app.use(errorHandlerMiddleware);
  app.use(loggerMiddleware);

  app.listen(PORT, () => console.log("server ready at *" + PORT));
})();
