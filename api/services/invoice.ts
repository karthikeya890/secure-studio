import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";

class InvoiceService {
    // Create a Invoice
    async createInvoice(data: Prisma.InvoiceUncheckedCreateInput) {
        try {
            return await prisma.invoice.create({ data });
        } catch (error) {
            throw error;
        }
    }
}

class InvoiceMiscService {

    async generateInvoiceCode() {
        const year = new Date().getFullYear();
        const count = await prisma.invoice.count({
            where: { code: { startsWith: `IN${year}` } }
        });
        return `IN${year}${String(count + 1).padStart(3, '0')}`;
    }


    // Get all Invoices with pagination
    async getAllInvoicesOfUser(userId: string, page: number = 1, limit: number = 10) {
        try {
            const [invoices, totalCount] = await Promise.all([
                prisma.invoice.findMany({
                    where: { userId },
                    include: {
                        booking: { include: { service: true, payment: true }, },
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { createdAt: "desc" }
                }),
                prisma.invoice.count({ where: { userId } })
            ]);
            return { invoices, totalCount };
        } catch (error) {
            throw error;
        }
    }

    async invoiceDetailsForDownload(id: string) {
        try {
            return prisma.invoice.findUnique({ where: { id }, include: { User: true, booking: { include: { service: { select: { name: true } }, payment: true, subscription: { select: { gstValue: true } } } } } })
        } catch (error) {
            throw error;
        }
    }

}

export const invoiceService = new InvoiceService();
export const invoiceMiscService = new InvoiceMiscService();
