import Vue from "vue";
const axios = require('axios').default,
    serverName = "http://tt-crm.loc:8082/";


class ApiService {
    public login(body: any): any {
        return axios.post(`${serverName}api/login`, body)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }
}

export default new ApiService();
