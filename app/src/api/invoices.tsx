import axiosInstance from './axiosConfig';

export const fetchInvoices: any = async (page: number, pageSize: number): Promise<void> => {
    try {
        const response = await axiosInstance.get(`/invoice/user/all?page=${page}&limit=${pageSize}`);
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};

export const downloadInvoice: any = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/invoice/download/${id}`, {
            headers: { "Content-Type": "image/png" },
            responseType: "blob",
        });
        return response;
    } catch (error: any) {
        throw error.response
    }
};