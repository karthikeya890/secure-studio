import { create } from "zustand";
import { fetchAmenities, fetchServicesCategories } from "../api/home";

interface HomeState {
    amenities: [],
    servicesCategories: [],
    selectedCategory: string | undefined | null;
    filteredServices: any[];
    fetchAmenities: () => Promise<void>;
    fetchServicesCategories: () => Promise<void>;
    selectCategory: (categoryId: string | null) => void;
}

// Zustand Store
export const useHomeStore = create<HomeState>((set, get) => ({
    amenities: [],
    servicesCategories: [],
    selectedCategory: undefined,
    filteredServices: [],
    fetchAmenities: async () => {
        const response = await fetchAmenities();
        set({ amenities: response.data });
    },
    fetchServicesCategories: async () => {
        const { selectCategory } = get();

        const response = await fetchServicesCategories();
        let allServices: any[] = [];
        response.data.forEach((category: any) => {
            allServices = [...allServices, ...category.services];
        });

        set({ servicesCategories: response.data, selectedCategory: null, filteredServices: allServices });
        selectCategory(response.data[0].id)
    },
    selectCategory: (categoryId) => {
        const { servicesCategories } = get();

        if (categoryId === null) {
            // Show all services when no category is selected
            let allServices: any[] = [];
            servicesCategories.forEach((category: any) => {
                allServices = [...allServices, ...category.services];
            });

            set({ selectedCategory: null, filteredServices: allServices });
        } else {
            // Filter services based on selected category
            const selectedCategory: any = servicesCategories.find((cat: any) => cat.id === categoryId);
            set({
                selectedCategory: categoryId,
                filteredServices: selectedCategory ? selectedCategory.services : [],
            });
        }
    },
}));
