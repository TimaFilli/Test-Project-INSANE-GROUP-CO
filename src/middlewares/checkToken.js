import { AuthorizationError } from "../utils/errors.js";
import JWT from "../config/jwt.js";

export default async (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) token = req.params.token;

    if (!token) {
      throw new AuthorizationError("token is required!");
    }

    const { userId, agent } = JWT.verify(token);

    if (req.headers["user-agent"] !== agent) {
      throw new AuthorizationError("token is sent from wrong device!");
    }

    const user = await req.models.User.findOne({ where: { userId } });

    if (!user) {
      throw new AuthorizationError("invalid token");
    }

    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};
