import { create } from "zustand";
import { fetchInvoices, downloadInvoice } from "../api/invoices";

interface Invoice {
    id: string;
    totalAmount: number;
    taxAmount: number;
    discount: number;
    finalAmount: number;
    booking: any;
    createdAt: string;
}

interface InvoiceState {
    invoicePreview: any;
    invoices: Invoice[];
    page: number;
    totalPages: number;
    pageSize: number;
    loading: boolean;
    downloadLoding: boolean;
    fetchInvoices: (page?: number) => Promise<void>;
    setPage: (page: number) => void;
    downloadInvoiceId: string;
    downloadInvoice: (id: string) => void;
    previewInvoice: (id: string) => void;
    downloadPreviewInvoice: (id: string) => void;
}

// Zustand Store
export const useInvoicesStore = create<InvoiceState>((set, get) => ({
    invoicePreview: undefined,
    invoices: [],
    page: 1,
    totalPages: 1,
    pageSize: 10,
    loading: false,
    downloadLoding: false,
    fetchInvoices: async (page = 1) => {
        set({ loading: true });
        const { pageSize } = get();
        const response = await fetchInvoices(page, pageSize);
        set({ invoices: response.data.invoices, totalPages: response.data.totalCount, loading: false, page });
    },
    setPage: (page) => set({ page }),
    downloadInvoiceId: "",
    downloadInvoice: async (id) => {
        set({ downloadLoding: true, downloadInvoiceId: id });
        const response = await downloadInvoice(id);
        set({ downloadLoding: false, downloadInvoiceId: "" });
        const blob = new Blob([response.data], { type: "image/png" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },
    previewInvoice: async (id) => {
        set({ invoicePreview: undefined });
        const response = await downloadInvoice(id);
        const blob = new Blob([response.data], { type: "image/png" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        set({ invoicePreview: url });
        document.body.appendChild(a);
    },
    downloadPreviewInvoice: async (id) => {
        const { invoicePreview, } = get();
        const a = document.createElement("a");
        a.href = invoicePreview;
        a.download = `invoice-${id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

}));
