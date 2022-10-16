export default class API {
    base_url;

    constructor(base_url) {
        this.base_url = base_url;
    }

    getBaseUrl() {
        return this.base_url;
    }

    async sendRequest(url, method, params, body) {
        console.log({url, method, params, body});
        console.log(`${this.base_url}${url}`)
        let res;
        try {
            res = await fetch(`${this.base_url}${url}`, {
                body,
                method
            });
        } catch(e) {
            console.log(e);
        }
        console.log(res);
        const json_body = await res.json();
        console.log({json_body})
        return json_body;
    }
}