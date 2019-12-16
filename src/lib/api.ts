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

    public showVenueObject(venue_id: number = 1): any {
        return axios.get(`${serverName}/v0/venues/objects?venue_id=${venue_id}`);
    }

    public activitiesType(): any {
        return axios.get(`${serverName}/v0/activities/type`);
    }

    public createClient(): any {
        return axios.get(`${serverName}/v0/clients`);
    }

    public customerAdd({
        email,
        first_name,
        second_name,
        middle_name,
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
        return axios.post(`${serverName}/v0/clients`, {
            account_id: 1,
            email: email,
            first_name: first_name,
            middle_name: middle_name,
            second_name: second_name,
            birth_date: birth_date,
            sex: sex,
            document_id: document_id,
            notes: notes,
            switch_user: switch_user,
            username: username,
            password: password,
            price:  price,
            phones: phones,
        })
    }

    public customerDelete(id: number) {
        return axios.delete(`${serverName}/v0/clients/${id}`);
    }

    public customerUpdate({
              id,
              email,
              first_name,
              second_name,
              middle_name,
              birth_date,
              sex,
              document_id,
              notes,
              price,
              phones,
        }: any) {
        return axios.put(`${serverName}/v0/clients/${id}`, {
            account_id: 1,
            email: email,
            first_name: first_name,
            middle_name: middle_name,
            second_name: second_name,
            birth_date: birth_date,
            sex: sex,
            document_id: document_id,
            notes: notes,
            switch_user: false,
            price:  price,
            phones: phones,
        });
    }

    public coachAdd({
        email,
        first_name,
        second_name,
        middle_name,
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
        return axios.post(`${serverName}/v0/coaches`, {
            account_id: 1,
            email: email,
            first_name: first_name,
            middle_name: middle_name,
            second_name: second_name,
            birth_date: birth_date,
            sex: sex,
            document_id: document_id,
            notes: notes,
            switch_user: switch_user,
            username: username,
            password: password,
            position: position,
            wage: wage,
            price:  price,
            style_id: style_id,
            phones: phones,
            availability: availability,
        })
    }

    public coachUpdate({
        id,
        email,
        first_name,
        second_name,
        middle_name,
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
    }: any) {
        return axios.put(`${serverName}/v0/coaches/${id}`, {
            account_id: 1,
            email,
            first_name,
            second_name,
            middle_name,
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
        });
    }

    public coachDelete(id: number) {
        return axios.delete(`${serverName}/v0/coaches/${id}`);
    }

    public showAllCoach(): any {
        return axios.get(`${serverName}/v0/coaches`);
    }

    public activityStyle(): any {
        return axios.get(`${serverName}/v0/activities/style`);
    }

    public listRecord({venue_id = 1, date, coach, client, mobile}: any): any {
        let dateR = date ? `&date=${date}` : "",
            coachR = coach ? `&coach=${coach}` : "",
            clientR = client ? `&client=${client}` : "",
            mobileR = mobile ? `&mobile=${mobile}` : "" ;

        return axios.get(`${serverName}/v0?venue_id=${venue_id}${dateR}${coachR}${clientR}${mobileR}`);
    }

    public recordOne(id: number): any {
        return axios.get(`${serverName}/v0/records/${id}`);
    }
}

export default new ApiService();
