export default class API {
    base_url;

    constructor(base_url='', api_route='') {
        this.base_url = base_url;
        this.api_route = api_route
        this.api_url = base_url + api_route
    }

    async sendRequest(endpoint, method, params, body, token) {
        let res;
        if (!token) {
            token = localStorage.getItem('token') || ''
        }
        const request_url = `${this.api_url}${endpoint}?` + new URLSearchParams(params);
        const req = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                'Authorization': `Bearer ${token}`
            },
            method
        }
        if (body) {
            req.body = JSON.stringify(body)
        }
        try {
            res = await fetch(request_url, req);
        } catch(e) {
            console.error(e);
        }
        const json_body = await res.json();
        return json_body;
    }
}