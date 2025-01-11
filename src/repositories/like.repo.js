import LikeModel from "../schema/likes.schma.js";
import crudRepo from "./crudRepo.js";


const likeRepo = {
    ...crudRepo(LikeModel),
}

export default likeRepo;