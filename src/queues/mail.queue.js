import Queue from "bull";

import { RADIS_HOST, RADIS_PASSWORD, RADIS_PORT} from "../config/variables.js";

export default new Queue("mailQueue", {
    redis: {
        host: RADIS_HOST,
        port: RADIS_PORT,
        password : RADIS_PASSWORD
    },
});