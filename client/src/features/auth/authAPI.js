import backend_url from "../../utils/backend_url";
import API from "../../utils/api_base";


export const authAPI = new API(`${backend_url.origin}`, '/api/auth/');