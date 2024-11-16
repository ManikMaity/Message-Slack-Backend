import ChannelModel from "../schema/channel.schema.js";
import crudRepo from "./crudRepo.js";

const channelRepo = {
    ...crudRepo(ChannelModel)
}

export default channelRepo;