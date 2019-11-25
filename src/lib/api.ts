import Vue from "vue";
const axios = require('axios').default,
    serverName = "http://tt-crm.loc:8082/";


class ApiService {
    public login(body: any): any {
        return axios.post(`${serverName}api/login`, body, { headers: {
                "Access-Control-Allow-Origin": "*",
            },
            responseType: 'json',
        });
    }
}

export default new ApiService();
