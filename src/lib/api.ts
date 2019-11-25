import Vue from "vue";
const axios = require('axios').default,
    serverName = "http://tt-crm.loc:8081/";


class ApiService {
    public login(body: any): any {
        return axios.post(`${serverName}api/login`, body, { headers: {
                "Content-Type":"application/json"
            },
            responseType: 'json',
        });
    }
}

export default new ApiService();
