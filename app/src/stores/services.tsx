import { create } from "zustand";
import { getAllServiceCategories } from "../api/serviceCategory";
import { getDurationDates } from "../utils/date";


type Duration = "HOUR" | "DAY" | "MONTH" | "YEAR"

interface ServiceCategoryState {
    visiblePaymentCard: Boolean;
    bookingDetails: any;
    nextStep: any,
    planDetails: any,
    serviceCategories: any[];
    selectedPlans: any[];
    selectedServiceCategory: any;
    selectedService: any;
    selectedPlan: any;
    scheduleCount: number;
    submitSchedule: any;
    durationDates: any,
    durations: Duration[],
    duration: Duration,
    setDuration: (value: Duration) => void,
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

const useServiceStore = create<ServiceCategoryState>((set, get) => ({
    visiblePaymentCard: false,
    bookingDetails: undefined,
    nextStep: {},
    durationDates: {},
    planDetails: {},
    serviceCategories: [],
    selectedPlans: [],
    selectedServiceCategory: {},
    selectedService: {},
    selectedPlan: {},
    scheduleCount: 1,
    submitSchedule: undefined,
    durations: ["HOUR", "DAY", "MONTH", "YEAR"],
    duration: "HOUR",
    setDuration: (value) => {
        const selectedCategory = get().selectedServiceCategory;
        let matchedPlans = [];
        // Collect plans directly that match the first duration
        for (const service of selectedCategory.services) {
            const matchingPlans = service.subscriptions.filter((sub: any) => sub.duration === value);
            matchedPlans.push(...matchingPlans);
        }
        set({
            duration: value,
            selectedPlans: matchedPlans,
        });
    },
    setPaymentCard: (value) => set({ visiblePaymentCard: value }),
    setDurationDates: (data) => set({ durationDates: data }),
    setSubmitSchedule: (data) => set({ submitSchedule: data }),
    getAllServiceCategories: async () => {
        try {
            const response = await getAllServiceCategories();
            let matchedPlans = [];
            let uniqueDurations = new Set<Duration>();
            for (const service of response.data[0].services) {
                for (const sub of service.subscriptions) {
                    uniqueDurations.add(sub.duration); // Collect unique durations
                }
            }
            // Get the first available duration
            const durationOrder = ["HOUR", "DAY", "MONTH", "YEAR"];
            const availableDurations = Array.from(uniqueDurations).sort(
                (a, b) => durationOrder.indexOf(a) - durationOrder.indexOf(b)
            );
            const firstDuration = availableDurations[0]; // Use store duration if available, else take the first one

            // Collect plans directly that match the first duration
            for (const service of response.data[0].services) {
                const matchingPlans = service.subscriptions.filter((sub: any) => sub.duration === firstDuration);
                matchedPlans.push(...matchingPlans);
            }


            set({
                serviceCategories: response.data, selectedServiceCategory: response.data[0],
                selectedPlans: matchedPlans,
                durations: availableDurations,
                duration: firstDuration,
            });
        } catch (error) {
            console.error("Failed to fetch service categories:", error);
        }
    },
    setSelectedServiceCategory: (data) => {
        let matchedPlans = [];
        let uniqueDurations = new Set<Duration>();
        for (const service of data.services) {
            for (const sub of service.subscriptions) {
                uniqueDurations.add(sub.duration); // Collect unique durations
            }
        }
        // Get the first available duration
        const durationOrder = ["HOUR", "DAY", "MONTH", "YEAR"];
        const availableDurations = Array.from(uniqueDurations).sort(
            (a, b) => durationOrder.indexOf(a) - durationOrder.indexOf(b)
        );
        const firstDuration = availableDurations[0];
        // Collect plans directly that match the first duration
        for (const service of data.services) {
            const matchingPlans = service.subscriptions.filter((sub: any) => sub.duration === firstDuration);
            matchedPlans.push(...matchingPlans);
        }
        set({
            selectedServiceCategory: data,
            selectedPlans: matchedPlans,
            durations: availableDurations,
            duration: firstDuration,
        });
    },
    setSelectedService: (data) => { set({ selectedService: data, selectedPlan: data.subscriptions[0] }); },
    setSelectedPlan: (data) => {
        const durationDates = getDurationDates(data?.duration, data?.defaultValue);
        set({ selectedPlan: data, durationDates });
    },
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
