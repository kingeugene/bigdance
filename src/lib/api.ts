import Vue from "vue";
const axios = require('axios').default,
    serverName = process.env.VUE_APP_NAME_SERVE;


class ApiService {
    public login(body: any): any {
        return axios.post(`${serverName}api/login`, body)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public logout(): any {
        return axios.post(`${serverName}api/logout`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});;
            });
    }

    public listVenues(): any {
        return axios.get(`${serverName}api/v0/venues`);
    }

    public showVenueObject(): any {
        return axios.get(`${serverName}api/v0/venues/objects`);
    }

    public activitiesType(): any {
        return axios.get(`${serverName}api/v0/activities/type`);
    }

    public createClient(): any {
        return axios.get(`${serverName}api/v0/clients`);
    }

    public showAllCoach(): any {
        return axios.get(`${serverName}api/v0/coaches`);
    }

}

export default new ApiService();
