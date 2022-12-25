import { AuthenticationError, ValidationError } from "../utils/errors.js";
import sha256 from "sha256";
import JWT from "../config/jwt.js";

const GET_USERS = async (req, res, next) => {
  try {
    const page = req.query.page;

    if (!page) {
      const users = await req.models.User.findAll({
        attributes: { exclude: ["password"] },
      });

      const posts = await req.models.Post.findAll();

      for (let user of users) {
        let a = posts.filter((post) => {
          return post.dataValues.author == user.userId ? true : false;
        });
        user.post = a;
      }

      return res.status(200).send(users);
    }

    const limit = process.env.PAGINATION_LIMIT;
    const offset = 0 + (page - 1) * limit;

    const users = await req.models.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: { exclude: ["password"] },
    });

    const posts = await req.models.Post.findAll();

    for (let user of users) {
      let a = posts.filter((post) => {
        return post.dataValues.author == user.userId ? true : false;
      });
      user.post = a;
    }

    return res.status(200).send(users.rows);
  } catch (error) {
    next(error);
  }
};

const POST_LOGIN = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await req.models.User.findOne({
      where: {
        username,
        password: sha256(password),
      },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new AuthenticationError("Wrong username or password!");
    }
    return res.status(200).json({
      status: 200,
      message: "The user successfully logged in!",
      data: user,
      token: JWT.sign({
        userId: user.userId,
        agent: req.headers["user-agent"],
      }),
    });
  } catch (error) {
    next(error);
  }
};
const POST_REGISTER = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const user = await req.models.User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      throw new AuthenticationError("The user already exists!");
    }

    const record = await req.models.User.create(
      {
        username,
        password: sha256(password),
        email,
      },
      {
        returning: true,
      }
    );

    record.password = undefined;

    return res.status(200).json({
      status: 200,
      message: "The user successfully registered!",
      data: record,
      token: JWT.sign({
        userId: record.userId,
        agent: req.headers["user-agent"],
      }),
    });
  } catch (error) {
    next(error);
  }
};

const GET_USER = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await req.models.User.findOne({
      where: {
        userId,
      },
      attributes: { exclude: ["password"] },
    });

    const posts = await req.models.Post.findAll();

    let a = posts.filter((post) => {
      return post.dataValues.author == user.userId ? true : false;
    });
    user.post = a;

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const PUT_USER = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;

    const user = await req.models.User.findOne({
      where: { userId },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new NotFoundError("there is no such user!");
    }

    const body = {
      username,
      email,
    };

    await req.models.User.update(body, {
      where: {
        userId,
      },
    });

    await user.reload();

    return res.status(200).json({
      status: 200,
      message: "The user updated successfully!",
      body: user,
    });
  } catch (error) {
    next(error);
  }
};

const DELETE_USER = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await req.models.User.findOne({
      where: { userId },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new NotFoundError("there is no such user!");
    }

    await req.models.User.destroy({ where: { userId } });

    return res.status(200).json({
      status: 200,
      message: "The user deleted!",
      body: user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  POST_REGISTER,
  DELETE_USER,
  POST_LOGIN,
  GET_USERS,
  GET_USER,
  PUT_USER,
};
