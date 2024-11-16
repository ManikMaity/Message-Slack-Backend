import WorkspaceModel from "../schema/workspace.schema.js";
import crudRepo from "./crudRepo.js";

const workspaceRepo = {
    ...crudRepo(WorkspaceModel),
    getWorkspaceByName : async (name) => {
        const workspace = await WorkspaceModel.findOne({name});
        return workspace;
    },
    getWorkspaceByJoinCode : async (joinCode) => {},
    addMemberToWorkspace : async (workspaceId, userId) => {},
    addChannelToWorkspace : async (workspaceId, channelId) => {},
    fetchAllWorkspacesByMemberId : async (memberId) => {},
    
}

export default workspaceRepo