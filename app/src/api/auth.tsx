import axiosInstance from './axiosConfig';

interface LoginCredentials {
  email: string;
}

export const sendOTP: any = async (credentials: LoginCredentials): Promise<void> => {
  try {
    const response = await axiosInstance.post('/auth/send-otp', credentials);
    return response.data;
  } catch (error: any) {
    throw error.response
  }
};

export const verifyOTP: any = async (credentials: LoginCredentials): Promise<void> => {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', credentials);
    return response.data;
  } catch (error: any) {
    throw error.response
  }
};

export const tokenRefresh: any = async (body: { token: string }): Promise<void> => {
  const response = await axiosInstance.post('/auth/refreshToken', body);
  return response.data.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};