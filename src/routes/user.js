import { Router } from "express";
import validation from "../middlewares/validation.js";
import checkToken from "../middlewares/checkToken.js";
import CT from "../controllers/user.js";

const router = Router();

router.post("/user/register", validation, CT.POST_REGISTER);
router.post("/user/login", validation, CT.POST_LOGIN);

router.get("/profiles", checkToken, CT.GET_USERS);
router.get("/profile/:userId", checkToken, CT.GET_USER);

router.put("/profile/:userId", checkToken, CT.PUT_USER);
router.delete("/profile/:userId", checkToken, CT.DELETE_USER);

export default router;
