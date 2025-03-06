
import { invoiceMiscService } from "../../services/invoice"
import { convertDatePrimaryStyle } from "../../utils/date";
export const getInvoiceTemplate = async (id: string) => {

    const invoice = await invoiceMiscService.invoiceDetailsForDownload(id);
    const user = invoice?.User;
    const service = invoice?.booking?.service;
    const booking = invoice?.booking;
    const payment = booking?.payment;

    const invoiceDetails = {
        id: invoice?.code,
        billedTo: user?.name,
        date: convertDatePrimaryStyle(payment?.paymentCompletedAt)
    }

    const invoiceItems = {
        name: service?.name,
        price: invoice?.totalAmount
    }

    const invoiceSummary = {
        subTotal: invoice?.totalAmount,
        discount: invoice?.discount,
        taxPercentage: booking?.subscription?.gstValue,
        taxAmount: invoice?.taxAmount,
        totalAmount: invoice?.finalAmount
    }

    const renderInvoiceDetails = () => {
        return `
            <div class="invoice-details">
                <div>
                    <strong>Invoice #:</strong> ${invoiceDetails.id}
                    <strong>Date:</strong> ${invoiceDetails.date}
                </div>
                <div>
                    <strong>Billed To:</strong> ${invoiceDetails.billedTo}
                </div>
            </div>
        `
    }

    const renderInvoiceItems = () => {
        return `
            <table class="invoice-items">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th class="text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${invoiceItems.name}</td>
                        <td class="text-right">₹${invoiceItems.price}</td>
                    </tr>
                </tbody>
            </table>
        `
    }


    const renderInvoiceSummary = () => {
        return `
            <table class="invoice-summary">
                <tr>
                    <td>Subtotal :</td>
                    <td class="text-right">₹${invoiceSummary.subTotal}</td>
                </tr>
                <tr>
                    <td>Discount :</td>
                    <td class="text-right">₹${invoiceSummary.discount || "0"}</td>
                </tr>
                <tr>
                    <td>GST (${invoiceSummary.taxPercentage?.toFixed(0)}%) :</td>
                    <td class="text-right">₹${invoiceSummary.taxAmount}</td>
                </tr>
                <tr>
                    <td class="total-amount">Total Amount:</td>
                    <td class="total-amount">₹${invoiceSummary.totalAmount}</td>
                </tr>
            </table>
        `
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice - Secure Studio</title>
    <style>
        :root {
            --primary: #006195;
            --secondary: #038AD9;
            --accent: #FF7A00;
            --dark: #000000;
            --light: #f8f9fa;
        }

        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            margin: 0;
            background: #ffffff;
            color: var(--dark);
        }

        .invoice-wrapper {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            overflow: hidden;
        }

        .letterheadContainer {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            padding: 30px 40px;
            gap: 20px;
            justify-content: space-between;
            
        }
        .letterhead {
            color: white;
        }

        .letterhead-logo {
            height: 100px;
            background:white;
            padding: 10px;
            border-radius: 10px;
        }

        .letterhead h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -1px;
        }

        .letterhead p {
            margin: 5px 0;
            font-size: 14px;
            opacity: 0.9;
        }

        .invoice-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            padding: 30px 40px;
            border-bottom: 2px solid var(--light);
        }

        .invoice-details div {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .invoice-details strong {
            color: var(--primary);
            font-weight: 600;
        }

        .invoice-items {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .invoice-items th,
        .invoice-items td {
            padding: 15px 30px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        .invoice-items th {
            background: var(--light);
            color: var(--primary);
            font-weight: 600;
        }

        .invoice-items td {
            color: var(--dark);
        }

        .invoice-items .text-right {
            text-align: right;
        }

        .invoice-summary {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .invoice-summary td {
            padding: 15px 30px;
            text-align: right;
            border-bottom: 1px solid #eee;
        }

        .invoice-summary .total-amount {
            color: var(--accent);
            font-weight: 700;
        }

        .payment-info {
            padding: 20px 40px;
            background: var(--light);
            border-top: 2px solid var(--light);
        }

        .payment-info p {
            margin: 5px 0;
        }

        .footer {
            padding: 20px 40px;
            text-align: center;
            color: var(--secondary);
            font-size: 14px;
            border-top: 2px solid var(--light);
        }

        .footer a {
            color: var(--accent);
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="invoice-wrapper">
        <!-- Letterhead -->
        <div class="letterheadContainer">
            <div class="letterhead">
                <h1>Secure Studio</h1>
                <p>3rd Floor, Jakotia Complex, Kothawada, Warangal, Telangana 506002</p>
                <p>Email: support@secure.studio | Phone: +91 9494644848</p>
            </div>
            <img class="letterhead-logo" src="data:image/png;base64,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" />
        </div>
        <!-- Invoice Details -->
        ${renderInvoiceDetails()}

        <!-- Invoice Items -->
        ${renderInvoiceItems()}

        <!-- Invoice Summary -->
        ${renderInvoiceSummary()}

        <!-- Payment Info -->
        <div class="payment-info">
            <p><strong>Note:</strong> Please Contact secure studio for any queries.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for choosing <a href="https://www.secure.studio">Secure Studio</a>!</p>
        </div>
    </div>
</body>
</html>`
}


