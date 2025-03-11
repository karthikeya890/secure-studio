import axiosInstance from './axiosConfig';

export const fetchBookings: any = async (page: number, pageSize: number): Promise<void> => {
    try {
        const response = await axiosInstance.get(`/booking/user/all?page=${page}&limit=${pageSize}`);
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};

export const fetchActiveBookings: any = async (page: number, pageSize: number): Promise<void> => {
    try {
        const response = await axiosInstance.get(`/booking/user/active?page=${page}&limit=${pageSize}`);
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};