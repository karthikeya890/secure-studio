import axiosInstance from './axiosConfig';

interface Credentials {
    planId: string;
    coupon?: string;
    scheduleCount?: number;
}

export const createOrder: any = async (credentials: Credentials): Promise<void> => {
    try {
        const response = await axiosInstance.post('/payment/create-order', credentials);
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};

export const cancelOrder: any = async (bookingId: string): Promise<void> => {
    try {
        const response = await axiosInstance.post('/payment/cancel-order', { bookingId });
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};

export const paymentFail: any = async (bookingId: string): Promise<void> => {
    try {
        const response = await axiosInstance.post('/payment/payment-failed', { bookingId });
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};

export const verifyPayment: any = async (credentials: any): Promise<void> => {
    try {
        const response = await axiosInstance.post('/payment/verify-payment', credentials);
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};