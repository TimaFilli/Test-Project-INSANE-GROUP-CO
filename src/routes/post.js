import { Router } from "express";
import validation from "../middlewares/validation.js";
import checkToken from "../middlewares/checkToken.js";
import CT from "../controllers/post.js";

const router = Router();

router.get("/posts", checkToken, CT.GET_POSTS);
router.get("/post/:postId", checkToken, CT.GET_POST);
router.post("/posts", checkToken, validation, CT.POST_POST);
router.delete("/post/:postId", checkToken, CT.DELETE_POST);

export default router;
