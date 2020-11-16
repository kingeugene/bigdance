interface SuccessResponse<TResponse = any, TNotification = string> {
    data: TResponse;
    status: number;
    // notification: string;
    // warning: string;
    // errors: null;
}

interface ErrorResponse<TResponse = any, TNotification = string> {
    data: null;
    status: number;
    // notification: string;
    // warning: string;
    // errors: Hash<string[]>;
}

type CommonResponse<TResponse = any> = SuccessResponse<TResponse> | ErrorResponse<TResponse>;


type TypeVenuesApi = {
    account_id: number;
    color: string;
    end_time: string;
    end_time_formated: string;
    id: number;
    interval: number;
    location: string;
    name: string;
    start_time: string;
    start_time_formated: number;
    venue_id: number;
};

type TypeHalsVenueApi = {
    id: number;
    name: string;
    venue_id: number;
    venue_name: string;
};
