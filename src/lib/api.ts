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

    public createRecord({venue_object_id, activity_id, color, start_time, end_time, status_record, cancelled_at, coaches, clients}: any): any {
        return axios.post(`${serverName}/v0/records`, {
            venue_object_id: venue_object_id,
            activity_id: activity_id,
            color: color,
            start_time: start_time,
            end_time: end_time,
            status: status_record,
            cancelled_at: cancelled_at,
            coaches: coaches,
            clients: clients
        })
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

    public listRecord({venue_id = 1, date, coach, client, mobile}: any): any {
        let dateR = date ? `?date=${date}` : "",
            coachR = coach ? `?coach=${coach}` : "",
            clientR = client ? `?client=${client}` : "",
            mobileR = mobile == null ? "" : `?mobile=${mobile}`;

        return axios.get(`${serverName}/v0?venue_id=${venue_id}${dateR}${coachR}${clientR}${mobileR}`);
    }
}

export default new ApiService();
