import { create } from 'zustand';
import { sendOTP, verifyOTP, tokenRefresh } from '../api/auth';
import { persist, createJSONStorage } from 'zustand/middleware';


interface AuthState {
  user: any,
  email: string,
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  otpToken: string | null;
  afterLoginGoTo: string,
  setAfterLoginGotTo: (value: string) => void,
  setOtpToken: (value: string | null) => void;
  sendOTP: (credentials: { email: string }) => Promise<void>;
  verifyOTP: (otpData: { otp: string }) => Promise<void>; tokenRefresh: () => Promise<void>;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

// Constants for error messages
const ERROR_MESSAGES = {
  OTP_TOKEN_MISSING: 'OTP token missing',
  USER_EMAIL_MISSING: 'User email is missing',
  NO_REFRESH_TOKEN: 'No refresh token available',
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {},
      email: "",
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      otpToken: null,
      afterLoginGoTo: "/dashboard",
      setAfterLoginGotTo: (value) => { set({ afterLoginGoTo: value }) },
      setOtpToken: (value) => { set({ otpToken: value }) },
      sendOTP: async (credentials) => {
        try {
          set({ email: credentials.email });
          const data = await sendOTP(credentials);
          return data.data;
        } catch (error) {
          throw error;
        }
      },

      // Verify OTP and set access/refresh tokens
      verifyOTP: async (otpData) => {
        try {
          const { email, otpToken } = get();
          if (!otpToken) throw new Error(ERROR_MESSAGES.OTP_TOKEN_MISSING);
          if (!email) throw new Error(ERROR_MESSAGES.USER_EMAIL_MISSING);

          const response = await verifyOTP({
            email: email,
            otp: otpData.otp,
            otpToken,
          });

          const { accessToken, refreshToken, user: userDetails } = response.data;
          const user = userDetails
          if (accessToken) {
            set({ isAuthenticated: true, accessToken, refreshToken, user });
          }

          return response.data;
        } catch (error) {
          throw error;
        }
      },
      tokenRefresh: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          console.error(ERROR_MESSAGES.NO_REFRESH_TOKEN);
          get().logout();
          return;
        }

        try {
          const response = await tokenRefresh({ token: refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          if (accessToken) {
            set({ isAuthenticated: true, accessToken, refreshToken: newRefreshToken });
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null });
        localStorage.clear();
      },
      setTokens: (accessToken, refreshToken) => { set({ accessToken, refreshToken }) },
    }),
    {
      name: 'auth-store', // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use JSON serialization with localStorage
    }
  )
);

export default useAuthStore;