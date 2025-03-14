import { create } from "zustand";
import { fetchBookings, fetchActiveBookings } from "../api/booking";

interface Booking {
    id: string;
    code: string;
    service: any;
    subscription: any;
    payment: any;
    startTime: string;
    endTime: string;
    status: string;
    invoice: any;
}

interface Subscription {
    id: string;
    code: string;
    service: any;
    subscription: any;
    payment: any;
    startTime: string;
    endTime: string;
    status: string;
    timeLeft: string;
    invoice: any;
    isStarted: Boolean;
}

interface BookingState {
    subscriptions: Subscription[],
    bookings: Booking[];
    page: number;
    totalPages: number;
    pageSize: number;
    loading: boolean;
    fetchBookings: (page?: number) => Promise<void>;
    fetchActiveBookings: (page?: number) => Promise<void>;
    setPage: (page: number) => void;
}

// Zustand Store
export const useBookingsStore = create<BookingState>((set, get) => ({
    subscriptions: [],
    bookings: [],
    page: 1,
    totalPages: 1,
    pageSize: 10,
    loading: false,
    fetchBookings: async (page = 1) => {
        set({ loading: true });
        const { pageSize } = get();
        const response = await fetchBookings(page, pageSize);
        set({ bookings: response.data.bookings, totalPages: response.data.totalCount, loading: false, page });
    },
    fetchActiveBookings: async (page = 1) => {
        set({ loading: true });
        const { pageSize } = get();
        const response = await fetchActiveBookings(page, pageSize);
        set({ subscriptions: response.data.bookings, totalPages: response.data.totalCount, loading: false, page });
    },
    setPage: (page) => set({ page }),
}));
