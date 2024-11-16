import WorkspaceModel from "../schema/workspace.schema.js";
import crudRepo from "./crudRepo.js";

const workspaceRepo = {
    ...crudRepo(WorkspaceModel),
    getWorkspaceByName : async (name) => {
        const workspace = await WorkspaceModel.findOne({name});
        return workspace;
    },
    getWorkspaceByJoinCode : async (joinCode) => {
        const workspace = await WorkspaceModel.findOne({joinCode});
        return workspace;
    },
    addMemberToWorkspace : async (workspaceId, userId, role = 'member') => {
        const workspace = await WorkspaceModel.findById(workspaceId);
        workspace.members.push({member : userId, role});
        await workspace.save();
        return workspace
    },
    addChannelToWorkspace : async (workspaceId, channelId) => {
        const workspace = await WorkspaceModel.findByIdAndUpdate(workspaceId, {$push : {channels : channelId}}, {new : true});
        return workspace;
    },
    fetchAllWorkspacesByMemberId : async (memberId) => {
        
    },

}

export default workspaceRepo