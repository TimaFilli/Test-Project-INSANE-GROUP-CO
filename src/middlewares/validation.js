import {
  USER_LOGIN_VALIDATION,
  USER_REGISTER_VALIDATION,
  POST_POST_VALIDATION,
} from "../utils/validation.js";
import { ValidationError } from "../utils/errors.js";

export default (req, res, next) => {
  try {
    if (req.url === "/posts" && req.method === "POST") {
      const { error } = POST_POST_VALIDATION.validate({ body: req.body });
      if (error) {
        throw new ValidationError(error.message);
      }
    }

    if (req.url === "/user/login" && req.method === "POST") {
      const { error } = USER_LOGIN_VALIDATION.validate({ body: req.body });
      if (error) {
        throw new ValidationError(error.message);
      }
    }

    if (req.url === "/user/register" && req.method === "POST") {
      const { error } = USER_REGISTER_VALIDATION.validate({ body: req.body });
      if (error) {
        throw new ValidationError(error.message);
      }
    }

    if (req.url === "/profile" && req.method === "PUT") {
      const { error } = PUT_USER_VALIDATION.validate({ body: req.body });
      if (error) {
        throw new ValidationError(error.message);
      }
    }

    if (req.url === "/profile" && req.method === "DELETE") {
      const { error } = DELETE_USER_VALIDATION.validate({ params: req.params });
      if (error) {
        throw new ValidationError(error.message);
      }
    }

    return next();
  } catch (error) {
    next(error);
  }
};
