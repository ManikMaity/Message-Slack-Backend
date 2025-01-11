import {Router} from "express";

const likeRouter = Router();

likeRouter.get("/", (req, res) => {
    res.json({msg : "Like route is working"})
})

export default likeRouter;