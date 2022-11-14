export default class API {
    base_url;

    constructor(base_url) {
        this.base_url = base_url;
    }

    getBaseUrl() {
        return this.base_url;
    }

    async sendRequest(url, method, params, body, token) {
        let res;
        if (!token) {
            token = ''
        }
        const request_url = `${this.base_url}${url}?` + new URLSearchParams(params);
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
            console.log(e);
        }
        const json_body = await res.json();
        return json_body;
    }
}