import { Request, Response } from "express";
import { invoiceMiscService } from "../services/invoice";
import { errorResponse, successResponse } from "../middlewares/responseHandler";
import puppeteer, { PDFOptions } from "puppeteer";
import { getInvoiceTemplate } from "../templates/misc/invoice";

class InvoiceController {
    async getAllInvoicesOfUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const { page, limit } = req.query as any;
            const invoices = await invoiceMiscService.getAllInvoicesOfUser(userId, parseInt(page), parseInt(limit));
            successResponse(res, "All Invoices fetched successfully", invoices);
        } catch (error: any) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }
    async downloadInvoice(req: Request, res: Response): Promise<void> {
        try {
            const InvoiceId = req.params.id as string;
            const htmlContent: any = await getInvoiceTemplate(InvoiceId);
            if (!htmlContent) throw new Error("Invoice HTML is empty!");

            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                headless: true,
            });

            const page = await browser.newPage();
            // Set the HTML content with a longer timeout
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // Set viewport for proper image size
            await page.setViewport({ width: 1280, height: 800 });

            // Take a screenshot instead of generating a PDF
            const imageBuffer = await page.screenshot({
                type: 'png',
                fullPage: true // Captures the entire page
            });

            await browser.close();

            // Ensure the buffer is valid
            if (!imageBuffer || imageBuffer.length === 0) {
                throw new Error("Generated image buffer is empty");
            }

            // Set response headers for image
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', 'inline; filename="invoice.png"');
            res.setHeader('Content-Length', imageBuffer.length);

            // Send the image buffer
            res.status(200).end(imageBuffer);
        } catch (error: any) {
            console.log(`🚫 Error: ${JSON.stringify(error, null, 2)}`);
            errorResponse(error, res);
        }
    }
}

export const invoiceController = new InvoiceController();
