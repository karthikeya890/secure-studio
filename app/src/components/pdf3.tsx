import React, { useRef, useState} from 'react';
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
    header: boolean;
    footer: boolean;
}

const Invoice: React.FC = () => {
    // State for PDF quality settings and loading state
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [pdfSettings, setPdfSettings] = useState<PdfQualitySettings>({
        dpi: 300,
        format: 'a4',
        orientation: 'portrait',
        header: true,
        footer: true
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
        checkbox: {
            marginRight: '8px'
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
        },
        // PDF Header and Footer containers
        pdfHeader: {
            display: 'none',
            padding: '10px',
            borderBottom: '1px solid #e2e8f0'
        },
        pdfFooter: {
            display: 'none',
            padding: '10px',
            borderTop: '1px solid #e2e8f0',
            fontSize: '12px',
            color: '#64748b',
            textAlign: 'center' as const
        }
    };

    const invoiceRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

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

    // Handle header toggle
    const handleHeaderToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPdfSettings({
            ...pdfSettings,
            header: e.target.checked
        });
    };

    // Handle footer toggle
    const handleFooterToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPdfSettings({
            ...pdfSettings,
            footer: e.target.checked
        });
    };

    // Calculate scale based on DPI setting
    const getScaleFromDpi = (dpi: number): number => {
        // Base scale is 2.0 at 300 DPI
        return (dpi / 150);
    };

    // Enhanced PDF generation with quality settings and header/footer
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
            const contentWidth = imgWidth * ratio;
            const contentHeight = imgHeight * ratio;

            let headerHeight = 0;
            let footerHeight = 0;
            let headerCanvas, footerCanvas;

            // Generate header if enabled
            if (pdfSettings.header && headerRef.current) {
                headerCanvas = await html2canvas(headerRef.current, {
                    scale: scale,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });
                headerHeight = 20; // height in mm
            }

            // Generate footer if enabled
            if (pdfSettings.footer && footerRef.current) {
                footerCanvas = await html2canvas(footerRef.current, {
                    scale: scale,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });
                footerHeight = 15; // height in mm
            }

            // Available content area height (accounting for header/footer)
            const availableHeight = pdfHeight - headerHeight - footerHeight - 20; // 20mm for margins
            
            // Calculate how many pages we need
            const pageCount = Math.ceil(contentHeight / availableHeight);
            
            // For each page
            for (let i = 0; i < pageCount; i++) {
                // Add a new page if we're not on the first page
                if (i > 0) {
                    pdf.addPage();
                }
                
                // Current Y position on the canvas
                const sourceY = i * (imgHeight / pageCount);
                
                // Current height to capture from source
                const sourceHeight = imgHeight / pageCount;
                
                // Current Y position on the PDF
                let currentY = 10; // Start with a 10mm top margin
                
                // Add header to the page if enabled
                if (pdfSettings.header && headerCanvas) {
                    const headerImgData = headerCanvas.toDataURL('image/png');
                    pdf.addImage(
                        headerImgData, 
                        'PNG', 
                        10, // X position
                        currentY, // Y position
                        pdfWidth - 20, // Width (with margins)
                        headerHeight // Height
                    );
                    currentY += headerHeight;
                }
                
                // Calculate the portion of the source image to use
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                pdf.addImage(
                    imgData, 
                    'JPEG', 
                    10, // X position
                    currentY, // Y position
                    contentWidth, // Width
                    contentHeight, // Height
                    undefined, // Alias
                    'FAST', // Compression
                    0, // Rotation
                );
                
                // Add footer to the page if enabled
                if (pdfSettings.footer && footerCanvas) {
                    const footerImgData = footerCanvas.toDataURL('image/png');
                    pdf.addImage(
                        footerImgData, 
                        'PNG', 
                        10, // X position
                        pdfHeight - footerHeight - 10, // Y position (10mm from bottom)
                        pdfWidth - 20, // Width (with margins)
                        footerHeight // Height
                    );
                    
                    // Add page numbers to footer
                    pdf.setFontSize(10);
                    pdf.setTextColor(100, 100, 100);
                    pdf.text(`Page ${i + 1} of ${pageCount}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
                }
            }

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
        printWindow.document.writeln(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Invoiced ${invoiceData.invoiceNumber}</title>
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

    // Current date formatted
    const getCurrentDate = (): string => {
        const date = new Date();
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

                <div style={styles.controlsRow}>
                    <div style={styles.controlGroup}>
                        <label style={styles.label}>
                            <input 
                                type="checkbox" 
                                style={styles.checkbox}
                                checked={pdfSettings.header}
                                onChange={handleHeaderToggle}
                                disabled={isGenerating}
                            />
                            Include PDF Header
                        </label>
                    </div>
                    <div style={styles.controlGroup}>
                        <label style={styles.label}>
                            <input 
                                type="checkbox" 
                                style={styles.checkbox}
                                checked={pdfSettings.footer}
                                onChange={handleFooterToggle}
                                disabled={isGenerating}
                            />
                            Include PDF Footer
                        </label>
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

            {/* PDF Header Template (hidden but used for generation) */}
            <div ref={headerRef} style={{...styles.pdfHeader, display: 'none'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <p style={{fontWeight: 'bold'}}>{invoiceData.companyInfo.name}</p>
                    </div>
                    <div>
                        <p style={{fontSize: '14px'}}>INVOICE #{invoiceData.invoiceNumber}</p>
                    </div>
                </div>
            </div>

            {/* PDF Footer Template (hidden but used for generation) */}
            <div ref={footerRef} style={{...styles.pdfFooter, display: 'none'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <p>Generated on: {getCurrentDate()}</p>
                    </div>
                    <div>
                        <p>{invoiceData.companyInfo.email}</p>
                    </div>
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