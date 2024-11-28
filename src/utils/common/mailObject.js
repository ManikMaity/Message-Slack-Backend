import { MAIL_ID } from "../../config/variables.js";

export const mailObject = {
    from: MAIL_ID,
}

export const createJoinWorkspaceMail = (workspaceName, to) => {
    return {
        from: MAIL_ID,
        to : to,
        subject: 'You have been added to a workspace',
        text :  `Congratulations! You have been added to a workspace ${workspaceName}.`
    }
}