import axiosInstance from './axiosConfig';


export const getAllServiceCategories: any = async (): Promise<void> => {
    try {
        const response = await axiosInstance.get('/serviceCatergory');
        return response.data;
    } catch (error: any) {
        throw error.response
    }
};
