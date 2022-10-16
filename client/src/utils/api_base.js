export default class API {
    base_url;

    constructor(base_url) {
        this.base_url = base_url;
    }

    getBaseUrl() {
        return this.base_url;
    }

    async sendRequest(url, method, params, body) {
        let res;
        const request_url = `${this.base_url}${url}` + new URLSearchParams(params);
        try {
            res = await fetch(request_url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                method
            });
        } catch(e) {
            console.log(e);
        }
        const json_body = await res.json();
        return json_body;
    }
}