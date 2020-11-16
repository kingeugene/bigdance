import Vue from "vue";
import {AxiosRequestConfig} from "axios";
const axios = require('axios').default,
    serverName = process.env.VUE_APP_NAME_SERVE;

type Response<T = {}> = Promise<CommonResponse<T>>;

class ApiService {
    private get(url: string) {
        return axios
            .get(url)
            .catch((error) => Promise.resolve({response: null, errors: error, status: 422}));
    }

    private post(url: string, data?) {
        return axios
            .post(url, data)
            .catch((error) => Promise.resolve({response: null, errors: error, status: 422}));
    }

    private put(url: string, data?) {
        return axios
            .put(url, data)
            .catch((error) => Promise.resolve({response: null, errors: error, status: 422}));
    }

    private delete(url: string) {
        return axios
            .delete(url)
            .catch((error) => Promise.resolve({response: null, errors: error, status: 422}));
    }

    public login(body: any): any {
        return this.post(`${serverName}/login`, body);
    }

    public logout(): any {
        return this.post(`${serverName}/logout`);
    }

    public createVenue({name, location, color, start_time, end_time, interval, id}: any):any {
        let dataArr: any = {};
        dataArr["account_id"] = 1;
        dataArr["name"] = name;
        dataArr["start_time"] = start_time;
        dataArr["end_time"] = end_time;
        dataArr["interval"] = interval;

        if (location) dataArr["location"] = location;
        if (color) dataArr["color"] = color;

        if (id) {
            return this.put(`${serverName}/v0/venues/${id}`, dataArr);
        }

        return this.post(`${serverName}/v0/venues`, dataArr);
    }

    public deleteVenue(id: number) {
        return this.delete(`${serverName}/v0/venues/${id}`);
    }

    public createHall({venue_id, name, id}: any):any {
        if (id) {
            return this.put(`${serverName}/v0/venues/objects/${id}`, {venue_id, name});
        }

        return this.post(`${serverName}/v0/venues/objects`, {venue_id, name});
    }

    public deleteHall(id: number) {
        return this.delete(`${serverName}/v0/venues/objects/${id}`);
    }

    public createStyleDance({label, id}: any): any {
        if (id) {
            return this.put(`${serverName}/v0/activities/style/${id}`, {"account_id": 1, name: label});
        }

        return this.post(`${serverName}/v0/activities/style`, {"account_id": 1, name: label});
    }

    public deleteStyleDance(id: number) {
        return this.delete(`${serverName}/v0/activities/style/${id}`);
    }

    public createTypeDance({label, color, block, id}: any): any {
        if (id) {
            return this.put(`${serverName}/v0/activities/type/${id}`, {"account_id": 1, name: label, color, block});
        }

        return this.post(`${serverName}/v0/activities/type`, {"account_id": 1, name: label, color, block});
    }

    public deleteTypeDance(id: number) {
        return this.delete(`${serverName}/v0/activities/type/${id}`);
    }

    public createRecord({venue_object_id, activity_id, color, start_time, end_time, status_record, cancelled_at, coaches, clients, number_weeks, description, edit}: any): any {
        return axios[edit ? "put" : "post"](`${serverName}/v0/records${edit ? '/' + edit : ""}`, {
            venue_object_id: venue_object_id,
            activity_id: activity_id,
            color: color,
            start_time: start_time,
            end_time: end_time,
            status: status_record,
            cancelled_at: cancelled_at,
            coaches: coaches,
            clients: clients,
            number_weeks: number_weeks,
            description,
        })
            .catch((error: any, message) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public copyRecord(id): any {
        return this.get(`${serverName}/v0/records/copy/${id}`);
    }

    public deleteRecord(id): any {
        return this.delete(`${serverName}/v0/records/${id}`);
    }

    public getListVenues(): Response<TypeVenuesApi[]> {
        return this.get(`${serverName}/v0/venues`);
    }

    public getListHalsVenue(): Response<TypeHalsVenueApi[]> {
        return this.get(`${serverName}/v0/venues/objects`);
    }

    public activitiesType(): any {
        return this.get(`${serverName}/v0/activities/type`);
    }

    public createClient(customer_id?: number): any {
        return customer_id
            ? this.get(`${serverName}/v0/clients/${customer_id}`)
            : this.get(`${serverName}/v0/clients`);
    }

    public customerAdd(body): any {
        return this.post(`${serverName}/v0/clients`, body);
    }

    public customerDelete(id: number) {
        return this.delete(`${serverName}/v0/clients/${id}`);
    }

    public customerUpdate(body, id) {
        return this.post(`${serverName}/v0/clients/${id}`, body);
    }

    public coachAdd(body): any {
        return this.post(`${serverName}/v0/coaches`, body);
    }

    public coachUpdate(body, person_id) {
        return this.post(`${serverName}/v0/coaches/${person_id}`, body);
    }

    public coachDelete(id: number) {
        return this.delete(`${serverName}/v0/coaches/${id}`);
    }

    public showAllCoach(coach_id?: number): any {
        return coach_id
            ? this.get(`${serverName}/v0/coaches/${coach_id}`)
            : this.get(`${serverName}/v0/coaches`);
    }

    public activityStyle(): any {
        return this.get(`${serverName}/v0/activities/style`);
    }

    public listRecord({venue_id = 3, date, coach, client, mobile, slide}: any): any {
        let dateR = date ? `&date=${date}` : "",
            coachR = coach ? `&coach=${coach}` : "",
            clientR = client ? `&client=${client}` : "",
            mobileR = mobile ? `&mobile=${mobile}` : "",
            slideR = slide ? `&slide=${slide}` : "" ;

        return this.get(`${serverName}/v0?venue_id=${venue_id}${dateR}${coachR}${clientR}${mobileR}${slideR}`);
    }

    public listRecordCoach({date, coach, client}: any): any {
        let dateR = date ? `&date=${date}` : "",
          clientR = client ? `&client=${client}` : "";

        return this.get(`${serverName}/v0?coach=${coach}${dateR}${clientR}`);
    }

    public listRecordCustomer({date, client, coach}: any): any {
        let dateR = date ? `&date=${date}` : "",
            coachR = coach ? `&coach=${coach}` : "";

        return this.get(`${serverName}/v0?client=${client}${dateR}${coachR}`);
    }

    public recordOne({date, time, venue_object_id}): any {
        return this.get(`${serverName}/v0?date=${date}&time=${time}&venue_object_id=${venue_object_id}`);
    }

    public userSettings(): any {
        return this.get(`${serverName}/user/info`);
    }
}

export default new ApiService();
