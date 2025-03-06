import React, { useRef, useState, CSSProperties } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box } from '@chakra-ui/react';
// Type definitions
interface InvoiceItem {
    id: number;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

interface Customer {
    name: string;
    address: string;
    email: string;
}

interface InvoiceData {
    invoiceNumber: string;
    date: string;
    customer: Customer;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    taxRate: number;
    total: number;
    paymentTerms: string;
    companyInfo: {
        name: string;
        address: string[];
        email: string;
    };
}

// PDF quality settings interface
interface PdfQualitySettings {
    dpi: number;
    format: string;
    orientation: 'portrait' | 'landscape';
}

const Invoice: React.FC = () => {
    // State for PDF quality settings and loading state
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [pdfSettings, setPdfSettings] = useState<PdfQualitySettings>({
        dpi: 300,
        format: 'a4',
        orientation: 'portrait'
    });

    // Sample invoice data
    const invoiceData: InvoiceData = {
        invoiceNumber: 'INV-2025-001',
        date: '2025-03-06',
        customer: {
            name: 'John Doe',
            address: '123 Main St, Anytown, AN 12345',
            email: 'john.doe@example.com'
        },
        items: [
            { id: 1, description: 'Web Development', quantity: 1, rate: 1200, amount: 1200 },
            { id: 2, description: 'UI/UX Design', quantity: 2, rate: 800, amount: 1600 },
            { id: 3, description: 'Content Creation', quantity: 5, rate: 100, amount: 500 }
        ],
        subtotal: 3300,
        taxRate: 9,
        tax: 297,
        total: 3597,
        paymentTerms: 'NET 30',
        companyInfo: {
            name: 'Your Company Name',
            address: [
                '123 Business Avenue',
                'Business City, BC 54321'
            ],
            email: 'contact@yourcompany.com'
        }
    };

    // Styles
    const styles = {
        // Main container
        container: {
            padding: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            color: '#333333'
        },
        // Controls section
        controlsContainer: {
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
        },
        controlsTitle: {
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#334155'
        },
        controlsRow: {
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '16px',
            marginBottom: '16px'
        },
        controlGroup: {
            display: 'flex',
            flexDirection: 'column' as const,
            minWidth: '200px'
        },
        label: {
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px',
            color: '#475569'
        },
        select: {
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            backgroundColor: 'white',
            fontSize: '14px'
        },
        buttonContainer: {
            display: 'flex',
            gap: '12px',
            marginTop: '16px'
        },
        button: {
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s ease-in-out'
        },
        disabledButton: {
            padding: '12px 24px',
            backgroundColor: '#94a3b8',
            color: 'white',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'not-allowed',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        // Invoice container
        invoiceContainer: {
            padding: '40px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: 'white',
            maxWidth: '800px',
            margin: '0 auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        },
        // Header styles
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '40px',
            paddingBottom: '20px',
            borderBottom: '1px solid #f1f5f9'
        },
        headerLeft: {
            textAlign: 'left' as const
        },
        headerRight: {
            textAlign: 'right' as const
        },
        invoiceTitle: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1e3a8a',
            marginBottom: '8px',
            letterSpacing: '0.5px'
        },
        invoiceNumber: {
            color: '#64748b',
            fontSize: '16px'
        },
        companyName: {
            fontWeight: 'bold',
            fontSize: '18px',
            marginBottom: '8px'
        },
        companyDetail: {
            margin: '4px 0',
            color: '#475569'
        },
        // Section styles
        section: {
            marginBottom: '36px'
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#334155'
        },
        customerName: {
            fontWeight: 600,
            fontSize: '16px',
            marginBottom: '8px'
        },
        customerDetail: {
            margin: '4px 0',
            color: '#475569'
        },
        detailRow: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e2e8f0',
            padding: '12px 0'
        },
        detailLabel: {
            fontWeight: 500,
            color: '#64748b'
        },
        detailValue: {
            fontWeight: 500
        },
        // Table styles
        table: {
            width: '100%',
            marginBottom: '36px',
            borderCollapse: 'collapse' as const
        },
        tableHeader: {
            backgroundColor: '#f8fafc'
        },
        tableHeaderCell: {
            padding: '12px 16px',
            textAlign: 'left' as const,
            fontWeight: 600,
            color: '#475569',
            borderBottom: '2px solid #e2e8f0'
        },
        tableHeaderCellRight: {
            padding: '12px 16px',
            textAlign: 'right' as const,
            fontWeight: 600,
            color: '#475569',
            borderBottom: '2px solid #e2e8f0'
        },
        tableRow: {
            borderBottom: '1px solid #f1f5f9'
        },
        tableCell: {
            padding: '14px 16px',
            verticalAlign: 'top' as const,
            fontSize: '14px'
        },
        tableCellRight: {
            padding: '14px 16px',
            textAlign: 'right' as const,
            verticalAlign: 'top' as const,
            fontSize: '14px'
        },
        // Totals section
        totalsContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '36px'
        },
        totalsBox: {
            width: '50%',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '6px'
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            color: '#475569'
        },
        totalRowBold: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            fontWeight: 'bold',
            color: '#1e3a8a',
            borderTop: '1px solid #e2e8f0',
            marginTop: '8px'
        },
        // Footer styles
        footer: {
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center' as const,
            color: '#64748b'
        }
    };

    const invoiceRef = useRef<HTMLDivElement>(null);

    // Handle DPI change
    const handleDpiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPdfSettings({
            ...pdfSettings,
            dpi: parseInt(e.target.value)
        });
    };

    // Handle format change
    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPdfSettings({
            ...pdfSettings,
            format: e.target.value
        });
    };

    // Handle orientation change
    const handleOrientationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPdfSettings({
            ...pdfSettings,
            orientation: e.target.value as 'portrait' | 'landscape'
        });
    };

    // Calculate scale based on DPI setting
    const getScaleFromDpi = (dpi: number): number => {
        // Base scale is 2.0 at 300 DPI
        return (dpi / 150);
    };

    // Enhanced PDF generation with quality settings
    const handleDownloadPdf = async (): Promise<void> => {
        if (!invoiceRef.current) return;

        try {
            setIsGenerating(true);
            const input = invoiceRef.current;

            // Calculate scale based on DPI
            const scale = getScaleFromDpi(pdfSettings.dpi);

            // Generate high-quality canvas with proper scaling
            const canvas = await html2canvas(input, {
                scale: scale,
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            // Create PDF with proper format and orientation
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({
                orientation: pdfSettings.orientation,
                unit: 'mm',
                format: pdfSettings.format
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Calculate appropriate ratio to fit the image in the PDF
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 20; // Top margin

            // Add image to PDF
            pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

            // Add metadata to PDF
            pdf.setProperties({
                title: `Invoice ${invoiceData.invoiceNumber}`,
                subject: 'Invoice',
                author: invoiceData.companyInfo.name,
                keywords: 'invoice, billing',
                creator: 'Invoice Generator'
            });

            // Save the PDF
            pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('There was an error generating the PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Print invoice
    const handlePrint = (): void => {
        if (!invoiceRef.current) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Please allow pop-ups to print the invoice');
            return;
        }

        const invoiceHtml = invoiceRef.current.outerHTML;

        printWindow.document.open();
        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Invoice ${invoiceData.invoiceNumber}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #333;
              margin: 0;
              padding: 20px;
            }
            @media print {
              body {
                padding: 0;
              }
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 20px;">
            <button onclick="window.print()">Print Invoice</button>
          </div>
          ${invoiceHtml}
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    return (
        <div style={styles.container}>
            {/* PDF Quality Controls */}
            <div style={styles.controlsContainer}>
                <h2 style={styles.controlsTitle}>Download Options</h2>
                <div style={styles.controlsRow}>
                    <div style={styles.controlGroup}>
                        <label style={styles.label} htmlFor="dpi-select">Quality (DPI)</label>
                        <select
                            id="dpi-select"
                            style={styles.select}
                            value={pdfSettings.dpi}
                            onChange={handleDpiChange}
                            disabled={isGenerating}
                        >
                            <option value="150">Standard (150 DPI)</option>
                            <option value="300">High (300 DPI)</option>
                            <option value="600">Very High (600 DPI)</option>
                        </select>
                    </div>

                    <div style={styles.controlGroup}>
                        <label style={styles.label} htmlFor="format-select">Paper Size</label>
                        <select
                            id="format-select"
                            style={styles.select}
                            value={pdfSettings.format}
                            onChange={handleFormatChange}
                            disabled={isGenerating}
                        >
                            <option value="a4">A4</option>
                            <option value="letter">Letter</option>
                            <option value="legal">Legal</option>
                        </select>
                    </div>

                    <div style={styles.controlGroup}>
                        <label style={styles.label} htmlFor="orientation-select">Orientation</label>
                        <select
                            id="orientation-select"
                            style={styles.select}
                            value={pdfSettings.orientation}
                            onChange={handleOrientationChange}
                            disabled={isGenerating}
                        >
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                    <button
                        onClick={handleDownloadPdf}
                        style={isGenerating ? styles.disabledButton : styles.button}
                        disabled={isGenerating}
                    >
                        {isGenerating ? 'Generating PDF...' : 'Download Invoice as PDF'}
                    </button>

                    <button
                        onClick={handlePrint}
                        style={isGenerating ? styles.disabledButton : { ...styles.button, backgroundColor: '#0f766e' }}
                        disabled={isGenerating}
                    >
                        Print Invoice
                    </button>
                </div>
            </div>

            {/* Invoice Component */}
            <Box
                ref={invoiceRef}
                style={styles.invoiceContainer}
            >
                {/* Header with company and invoice info */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <h1 style={styles.invoiceTitle}>INVOICE</h1>
                        <p style={styles.invoiceNumber}>#{invoiceData.invoiceNumber}</p>
                    </div>
                    <div style={styles.headerRight}>
                        <p style={styles.companyName}>{invoiceData.companyInfo.name}</p>
                        {invoiceData.companyInfo.address.map((line, index) => (
                            <p key={index} style={styles.companyDetail}>{line}</p>
                        ))}
                        <p style={styles.companyDetail}>{invoiceData.companyInfo.email}</p>
                    </div>
                </div>

                {/* Customer Information */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Bill To:</h2>
                    <p style={styles.customerName}>{invoiceData.customer.name}</p>
                    <p style={styles.customerDetail}>{invoiceData.customer.address}</p>
                    <p style={styles.customerDetail}>{invoiceData.customer.email}</p>
                </div>

                {/* Invoice Details */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Invoice Details:</h2>
                    <div style={styles.detailRow}>
                        <p style={styles.detailLabel}>Invoice Date:</p>
                        <p style={styles.detailValue}>{invoiceData.date}</p>
                    </div>
                    <div style={styles.detailRow}>
                        <p style={styles.detailLabel}>Payment Terms:</p>
                        <p style={styles.detailValue}>{invoiceData.paymentTerms}</p>
                    </div>
                </div>

                {/* Invoice Items Table */}
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.tableHeaderCell}>Description</th>
                            <th style={styles.tableHeaderCellRight}>Qty</th>
                            <th style={styles.tableHeaderCellRight}>Rate</th>
                            <th style={styles.tableHeaderCellRight}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item) => (
                            <tr key={item.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{item.description}</td>
                                <td style={styles.tableCellRight}>{item.quantity}</td>
                                <td style={styles.tableCellRight}>${item.rate.toFixed(2)}</td>
                                <td style={styles.tableCellRight}>${item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals Section */}
                <div style={styles.totalsContainer}>
                    <div style={styles.totalsBox}>
                        <div style={styles.totalRow}>
                            <p>Subtotal:</p>
                            <p>${invoiceData.subtotal.toFixed(2)}</p>
                        </div>
                        <div style={styles.totalRow}>
                            <p>Tax ({invoiceData.taxRate}%):</p>
                            <p>${invoiceData.tax.toFixed(2)}</p>
                        </div>
                        <div style={styles.totalRowBold}>
                            <p>Total Due:</p>
                            <p>${invoiceData.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <p>Thank you for your business!</p>
                </div>
            </Box>
        </div>
    );
};

export default Invoice;