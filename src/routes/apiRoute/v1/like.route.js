import {Router} from "express";
import verifyToken from "../../../middlewares/authMiddleware.js";
import { createLikeController } from "../../../controllers/like.controller.js";
import validate from "../../../validations/validator.js";
import { createLikeSchama } from "../../../validations/like.validation.js";

const likeRouter = Router();

likeRouter.get("/", (req, res) => {
    res.json({msg : "Like route is working"})
});

likeRouter.post("/:messageId", validate(createLikeSchama), verifyToken, createLikeController);

export default likeRouter;