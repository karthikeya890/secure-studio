import { create } from "zustand";
import { getAllServiceCategories } from "../api/serviceCategory";

interface ServiceCategoryState {
    bookingDetails: any;
    nextStep: any,
    planDetails: any,
    serviceCategories: any;
    selectedServiceCategoryId: string;
    selectedServiceId: string;
    selectedPlanId: string;
    scheduleCount: number;
    submitSchedule: any;
    durationDates: {},
    
    setDurationDates: (data: any) => void;
    setSubmitSchedule: (data: any) => void;
    setScheduleCount: (value: number) => void;
    getAllServiceCategories: () => Promise<void>;
    setSelectedServiceCategoryId: (id: string) => void;
    setSelectedServiceId: (id: string) => void;
    setSelectedPlanId: (id: string) => void;
    setNextStep: (data: any) => void;
    setBookingDetails: (data: any) => void;
    reset: () => void;
}

const useServiceCategory = create<ServiceCategoryState>((set, get) => ({
    bookingDetails: {},
    nextStep: {},
    durationDates: {},
    planDetails: {},
    serviceCategories: [],
    selectedServiceCategoryId: "",
    selectedServiceId: "",
    selectedPlanId: "",
    scheduleCount: 1,
    submitSchedule: undefined,
    setDurationDates: (data) => set({ durationDates: data }),
    setSubmitSchedule: (data) => set({ submitSchedule: data }),
    getAllServiceCategories: async () => {
        try {
            const response = await getAllServiceCategories();
            set({ serviceCategories: response.data, selectedServiceCategoryId: response.data[0].id, selectedServiceId: response.data[0].services[0].id });
        } catch (error) {
            console.error("Failed to fetch service categories:", error);
        }
    },
    setSelectedServiceCategoryId: (id: string) => {
        const { selectedServiceCategoryId, nextStep } = get();
        if (selectedServiceCategoryId) nextStep(0);
        set({ selectedServiceCategoryId: id === selectedServiceCategoryId ? "" : id });

    },
    setSelectedServiceId: (id: string) => {
        set({ selectedServiceId: id });
    },
    setSelectedPlanId: (id: string) => {
        const { serviceCategories, selectedServiceCategoryId, selectedServiceId } = get();
        const selectedCategory = serviceCategories.find((category: any) => category.id === selectedServiceCategoryId);
        const services = (selectedCategory as any)?.services || [];

        const selectedService = services.find((service: any) => service.id === selectedServiceId);
        const subscriptions = (selectedService as any)?.subscriptions || [];

        const planDetails = subscriptions.find((plan: any) => plan.id === id);
        set({ selectedPlanId: id, planDetails, scheduleCount: planDetails?.defaultValue });
    },
    setScheduleCount: (value: number) => set({ scheduleCount: value }),

    setNextStep: (data: any) => set({ nextStep: data }),
    setBookingDetails: (data: any) => set({ bookingDetails: data }),
    reset: () => {
        set({
            nextStep: {},
            planDetails: {},
            selectedServiceCategoryId: "",
            selectedServiceId: "",
            selectedPlanId: "",
        })
    }
}));

export default useServiceCategory;
