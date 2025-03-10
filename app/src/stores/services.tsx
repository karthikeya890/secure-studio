import { create } from "zustand";
import { getAllServiceCategories } from "../api/serviceCategory";

interface ServiceCategoryState {
    visiblePaymentCard: Boolean;
    bookingDetails: any;
    nextStep: any,
    planDetails: any,
    serviceCategories: [];
    selectedServiceCategory: any;
    selectedService: any;
    selectedPlan: any;
    scheduleCount: number;
    submitSchedule: any;
    durationDates: any,
    setPaymentCard: (value: boolean) => void;
    setDurationDates: (data: any) => void;
    setSubmitSchedule: (data: any) => void;
    setScheduleCount: (value: number) => void;
    getAllServiceCategories: () => Promise<void>;
    setSelectedServiceCategory: (data: any) => void;
    setSelectedService: (data: any) => void;
    setSelectedPlan: (data: any) => void;
    setNextStep: (data: any) => void;
    setBookingDetails: (data: any) => void;
    reset: () => void;
}

const useServiceStore = create<ServiceCategoryState>((set) => ({
    visiblePaymentCard: false,
    bookingDetails: undefined,
    nextStep: {},
    durationDates: {},
    planDetails: {},
    serviceCategories: [],
    selectedServiceCategory: {},
    selectedService: {},
    selectedPlan: {},
    scheduleCount: 1,
    submitSchedule: undefined,
    setPaymentCard: (value) => set({ visiblePaymentCard: value }),
    setDurationDates: (data) => set({ durationDates: data }),
    setSubmitSchedule: (data) => set({ submitSchedule: data }),
    getAllServiceCategories: async () => {
        try {
            const response = await getAllServiceCategories();
            set({
                serviceCategories: response.data, selectedServiceCategory: response.data[0],
                selectedService: response.data[0].services[0],
                selectedPlan: response.data[0].services[0].subscriptions[0],
            });
        } catch (error) {
            console.error("Failed to fetch service categories:", error);
        }
    },
    setSelectedServiceCategory: (data) => {
        set({
            selectedServiceCategory: data,
            selectedService: data.services[0],
            selectedPlan: data.services[0].subscriptions[0]
        });
    },
    setSelectedService: (data) => { set({ selectedService: data, selectedPlan: data.subscriptions[0] }); },
    setSelectedPlan: (data) => { set({ selectedPlan: data }); },
    setScheduleCount: (value: number) => set({ scheduleCount: value }),
    setNextStep: (data: any) => set({ nextStep: data }),
    setBookingDetails: (data: any) => set({ bookingDetails: data }),
    reset: () => {
        set({
            nextStep: {},
            planDetails: {},
            selectedServiceCategory: {},
            selectedService: {},
            selectedPlan: {},
        })
    }
}));

export default useServiceStore;
