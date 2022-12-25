import backend_url from "../../utils/backend_url";

import API from "../../utils/api_base";

export const projectAPI = new API(`${backend_url.origin}`, '/api/project/');