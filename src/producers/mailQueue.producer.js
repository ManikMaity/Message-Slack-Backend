import mailQueue from "../queues/mail.queue.js"
import "../processors/mail.processor.js"

export const addEmailToQueue = async (emailData) => {
    try {
        await mailQueue.add(emailData);
        console.log("Email added to queue");
    }
    catch(err){
        console.log("Add email to queue error", err);
    }
}
