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
            return axios.put(`${serverName}/v0/venues/${id}`, dataArr);
        }

        return axios.post(`${serverName}/v0/venues`, dataArr)
            .catch((error: any) => {
                  return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public deleteVenue(id: number) {
        return axios.delete(`${serverName}/v0/venues/${id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });

    }

    public createHall({venue_id, name, id}: any):any {
        if (id) {
            return axios.put(`${serverName}/v0/venues/objects/${id}`, {venue_id, name});
        }

        return axios.post(`${serverName}/v0/venues/objects`, {venue_id, name})
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public deleteHall(id: number) {
        return axios.delete(`${serverName}/v0/venues/objects/${id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public createStyleDance({label, id}: any): any {
        if (id) {
            return axios.put(`${serverName}/v0/activities/style/${id}`, {"account_id": 1, name: label})
                .catch((error: any) => {
                    return Promise.resolve({response: null, errors: error, status: 422});
                });
        }

        return axios.post(`${serverName}/v0/activities/style`, {"account_id": 1, name: label})
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public deleteStyleDance(id: number) {
        return axios.delete(`${serverName}/v0/activities/style/${id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public createTypeDance({label, color, block, id}: any): any {
        if (id) {
            return axios.put(`${serverName}/v0/activities/type/${id}`, {"account_id": 1, name: label, color, block})
                .catch((error: any) => {
                    return Promise.resolve({response: null, errors: error, status: 422});
                });
        }

        return axios.post(`${serverName}/v0/activities/type`, {"account_id": 1, name: label, color, block})
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public deleteTypeDance(id: number) {
        return axios.delete(`${serverName}/v0/activities/type/${id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
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
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public deleteRecord(id): any {
        return axios.delete(`${serverName}/v0/records/${id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public listVenues(): any {
        return axios.get(`${serverName}/v0/venues`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public showVenueObject(venue_id: number): any {
        return axios.get(`${serverName}/v0/venues/objects?venue_id=${venue_id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public listVenueObject(): any {
        return axios.get(`${serverName}/v0/venues/objects`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public activitiesType(): any {
        return axios.get(`${serverName}/v0/activities/type`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public createClient(customer_id?: number): any {
        return customer_id
            ? axios.get(`${serverName}/v0/clients/${customer_id}`)
            : axios.get(`${serverName}/v0/clients`)
                .catch((error: any) => {
                    return Promise.resolve({response: null, errors: error, status: 422});
                });
    }

    public customerAdd({
        id_card,
        first_name,
        second_name,
        birth_date,
        sex,
        document_id,
        notes,
        switch_user,
        username,
        password,
        price,
        phones,
    }: any ): any {
        let data: any = {};

        data["id_card"] = id_card;
        data["account_id"] = 1;
        data["first_name"] = first_name;
        data["second_name"] = second_name;
        data["switch_user"] = switch_user;
        data["sex"] = sex ? sex : "m";
        data["price"] = price ? price : 0;
        data["phones"] = phones[0] ? phones : ["000"];


        if (birth_date) data["birth_date"] = birth_date;
        if (document_id) data["document_id"] = document_id;
        if (notes) data["notes"] = notes;
        if (username) data["username"] = username;
        if (password) data["password"] = password;

        return axios.post(`${serverName}/v0/clients`, data)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public customerDelete(id: number) {
        return axios.delete(`${serverName}/v0/clients/${id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public customerUpdate({
              id,
              id_card,
              first_name,
              second_name,
              birth_date,
              sex,
              document_id,
              notes,
              price,
              phones,
        }: any) {
        return axios.put(`${serverName}/v0/clients/${id}`, {
            account_id: 1,
            id_card,
            first_name: first_name,
            second_name: second_name,
            birth_date: birth_date,
            sex: sex,
            document_id: document_id,
            notes: notes,
            switch_user: false,
            price:  price,
            phones: phones,
        })
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public coachAdd({
        id_card,
        first_name,
        second_name,
        birth_date,
        sex,
        document_id,
        notes,
        switch_user,
        username,
        password,
        position,
        wage,
        price,
        style_id,
        phones,
        availability,
    }: any ): any {
        let data: any = {};

        data["id_card"] = id_card;
        data["account_id"] = 1;
        data["first_name"] = first_name;
        data["second_name"] = second_name;
        data["switch_user"] = switch_user;
        data["style_id"] = style_id;
        data["sex"] = sex ? sex : "m";
        data["price"] = price ? price : 0;
        data["wage"] = wage ? wage : 0;
        data["phones"] = phones[0] ? phones : ["000"];
        data["availability"] = availability.length ? availability : [
            {
                "slot": "wednesday",
                "from": "8:30",
                "to": "17:00",
            },
        ];

        if (birth_date) data["birth_date"] = birth_date;
        if (document_id) data["document_id"] = document_id;
        if (notes) data["notes"] = notes;
        if (username) data["username"] = username;
        if (password) data["password"] = password;
        if (position) data["position"] = position;

        return axios.post(`${serverName}/v0/coaches`, data)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public coachUpdate({
        person_id,
        id_card,
        first_name,
        second_name,
        birth_date,
        sex,
        document_id,
        notes,
        position,
        wage,
        price,
        style_id,
        phones,
        availability,
    }: any) {
        return axios.put(`${serverName}/v0/coaches/${person_id}`, {
            account_id: 1,
            id_card,
            first_name,
            second_name,
            birth_date,
            sex,
            document_id,
            notes,
            switch_user: false,
            position,
            wage,
            price,
            style_id,
            phones,
            availability,
        })
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public coachDelete(id: number) {
        return axios.delete(`${serverName}/v0/coaches/${id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public showAllCoach(coach_id?: number): any {
        return coach_id
            ? axios.get(`${serverName}/v0/coaches/${coach_id}`)
            : axios.get(`${serverName}/v0/coaches`)
                .catch((error: any) => {
                    return Promise.resolve({response: null, errors: error, status: 422});
                });
    }

    public activityStyle(): any {
        return axios.get(`${serverName}/v0/activities/style`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public listRecord({venue_id = 3, date, coach, client, mobile}: any): any {
        let dateR = date ? `&date=${date}` : "",
            coachR = coach ? `&coach=${coach}` : "",
            clientR = client ? `&client=${client}` : "",
            mobileR = mobile ? `&mobile=${mobile}` : "" ;

        return axios.get(`${serverName}/v0?venue_id=${venue_id}${dateR}${coachR}${clientR}${mobileR}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public listRecordCoach({date, coach, client}: any): any {
        let dateR = date ? `&date=${date}` : "",
          clientR = client ? `&client=${client}` : "";

        return axios.get(`${serverName}/v0?coach=${coach}${dateR}${clientR}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public listRecordCustomer({date, client, coach}: any): any {
        let dateR = date ? `&date=${date}` : "",
            coachR = coach ? `&coach=${coach}` : "";

        return axios.get(`${serverName}/v0?client=${client}${dateR}${coachR}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }

    public recordOne({date, time, venue_object_id}): any {
        return axios.get(`${serverName}/v0/records?date=${date}&time=${time}&venue_object_id=${venue_object_id}`)
            .catch((error: any) => {
                return Promise.resolve({response: null, errors: error, status: 422});
            });
    }
}

export default new ApiService();
