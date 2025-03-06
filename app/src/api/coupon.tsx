import axiosInstance from './axiosConfig';

export const getCouponDetails: any = async (code: string, price: number): Promise<void> => {
    try {
        const response = await axiosInstance.post(`/coupon/reedem`, { code, price });
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};