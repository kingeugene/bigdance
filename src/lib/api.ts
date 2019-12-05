import Vue from "vue";
const axios = require('axios').default,
    serverName = process.env.VUE_APP_NAME_SERVE;


class ApiService {
    public login(body: any): any {
        return axios.post(`${serverName}/login`, body)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public logout(): any {
        return axios.post(`${serverName}/logout`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});;
            });
    }

    public listVenues(): any {
        return axios.get(`${serverName}/v0/venues`);
    }

    public showVenueObject(): any {
        return axios.get(`${serverName}/v0/venues/objects`);
    }

    public activitiesType(): any {
        return axios.get(`${serverName}/v0/activities/type`);
    }

    public createClient(): any {
        return axios.get(`${serverName}/v0/clients`);
    }

    public showAllCoach(): any {
        return axios.get(`${serverName}/v0/coaches`);
    }

    public listRecord(): any {
        return axios.get(`${serverName}/v0/?venue_id=1`);
    }
}

export default new ApiService();
