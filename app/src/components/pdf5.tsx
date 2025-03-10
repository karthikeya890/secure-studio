import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box, Flex } from '@chakra-ui/react';
import PdfHeader from "../assets/pdfHeader.png"
import pdfFooter from "../assets/pdfFooter.png"
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

    // New state for header/footer options
    const [includeHeaderFooter, setIncludeHeaderFooter] = useState<boolean>(true);
    const [headerText, setHeaderText] = useState<string>('Your Company Name - Confidential');
    const [footerText, setFooterText] = useState<string>('Thank you for your business');

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
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            color: '#333333',
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
            width: "100%",
            display: 'flex',
            flexDirection: 'column' as const,
            minWidth: '200px',
            flex: 1
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
        input: {
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            backgroundColor: 'white',
            fontSize: '14px'
        },
        checkbox: {
            marginRight: '8px'
        },
        checkboxLabel: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: 500,
            color: '#475569'
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
        // Invoice container - MODIFIED to be smaller in UI
        invoiceContainer: {
            padding: '20px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: 'white',
            maxWidth: '500px', // Reduced from 800px for UI display
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            margin: '0 auto', // Center the invoice
            transform: 'scale(0.95)', // Slightly reduce the scale for display
            transformOrigin: 'top center'
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
        // PDF preview
        pdfPreviewContainer: {
            textAlign: 'center' as const,
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
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

    // Handle header text change
    const handleHeaderTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderText(e.target.value);
    };

    // Handle footer text change
    const handleFooterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFooterText(e.target.value);
    };

    // Handle include header/footer checkbox
    const handleIncludeHeaderFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeHeaderFooter(e.target.checked);
    };

    // // IMPROVED PDF generation with headers and footers
    // const handleDownloadPdf = async (): Promise<void> => {
    //     if (!invoiceRef.current) return;

    //     try {
    //         setIsGenerating(true);

    //         // First, create a clone of the invoice with fixed dimensions for A4
    //         const clone = invoiceRef.current.cloneNode(true) as HTMLElement;

    //         // Create a temporary div for export with A4 dimensions
    //         const tempDiv = document.createElement('div');
    //         tempDiv.style.position = 'absolute';
    //         tempDiv.style.left = '-9999px';
    //         tempDiv.style.top = '-9999px';

    //         // Set fixed dimensions for A4 paper (in pixels at 96 DPI)
    //         // A4 is 210mm × 297mm which is approximately 794px × 1123px at 96 DPI
    //         const isPortrait = pdfSettings.orientation === 'portrait';
    //         const width = isPortrait ? '794px' : '1123px';
    //         const height = isPortrait ? '1123px' : '794px';

    //         // Apply A4 dimensions to the clone
    //         clone.style.width = width;
    //         clone.style.height = 'auto';
    //         clone.style.maxWidth = 'none';
    //         clone.style.transform = 'none';
    //         clone.style.padding = '40px'; // Add some padding for better aesthetics
    //         clone.style.boxSizing = 'border-box';

    //         tempDiv.appendChild(clone);
    //         document.body.appendChild(tempDiv);

    //         // Calculate scale based on DPI
    //         const scale = pdfSettings.dpi / 96;

    //         // Generate high-quality canvas
    //         const canvas = await html2canvas(clone, {
    //             scale: scale,
    //             useCORS: true,
    //             logging: false,
    //             allowTaint: true,
    //             backgroundColor: '#ffffff'
    //         });

    //         // Create PDF with proper format
    //         const pdf = new jsPDF({
    //             orientation: pdfSettings.orientation,
    //             unit: 'mm',
    //             format: pdfSettings.format
    //         });

    //         // Get PDF dimensions
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();

    //         // Convert canvas to image
    //         const imgData = canvas.toDataURL('image/jpeg', 1.0);

    //         // Calculate how many pages the content will take up
    //         const imgHeight = canvas.height * pdfWidth / canvas.width;
    //         const pageHeight = pdfHeight - 20; // Account for margins
    //         const contentPages = Math.ceil(imgHeight / pageHeight);

    //         // // Add header and footer to each page if enabled
    //         // if (includeHeaderFooter) {
    //         //     // Set up header and footer for all pages
    //         //     const addHeaderFooter = (pageIndex: number) => {
    //         //         // Header
    //         //         pdf.setFont('helvetica', 'normal');
    //         //         pdf.setFontSize(10);
    //         //         pdf.setTextColor(100, 100, 100);

    //         //         // Add header text
    //         //         pdf.text(headerText, 10, 10);

    //         //         // Add invoice number on the right side of header
    //         //         const invoiceNumberText = `Invoice #${invoiceData.invoiceNumber}`;
    //         //         const invoiceNumberWidth = pdf.getTextWidth(invoiceNumberText);
    //         //         pdf.text(invoiceNumberText, pdfWidth - 10 - invoiceNumberWidth, 10);

    //         //         // Add date to header
    //         //         const dateText = `Date: ${invoiceData.date}`;
    //         //         pdf.text(dateText, 10, 15);

    //         //         // Add page numbering to the header right side
    //         //         const pageText = `Page ${pageIndex + 1} of ${contentPages}`;
    //         //         const pageTextWidth = pdf.getTextWidth(pageText);
    //         //         pdf.text(pageText, pdfWidth - 10 - pageTextWidth, 15);

    //         //         // Footer
    //         //         // Add footer text centered at bottom
    //         //         const footerWidth = pdf.getTextWidth(footerText);
    //         //         pdf.text(footerText, (pdfWidth - footerWidth) / 2, pdfHeight - 10);
    //         //     };

    //         //     // Setup a wrapper to add our header and footer
    //         //     const originalAddPage = pdf.addPage.bind(pdf);
    //         //     pdf.addPage = function (format?: string | number[], orientation?: "p" | "portrait" | "l" | "landscape") {
    //         //         const result = originalAddPage.call(this, format, orientation); // Ensure the return value is jsPDF
    //         //         addHeaderFooter(this.getNumberOfPages() - 1);
    //         //         return result; // Return the jsPDF instance
    //         //     };

    //         //     // Add the content in chunks and add headers/footers
    //         //     for (let i = 0; i < contentPages; i++) {
    //         //         if (i > 0) {
    //         //             pdf.addPage();
    //         //         } else {
    //         //             // Add header/footer to first page
    //         //             addHeaderFooter(0);
    //         //         }

    //         //         // Calculate vertical position for this chunk of the image
    //         //         const sourceY = i * pageHeight * canvas.width / pdfWidth;
    //         //         const sourceHeight = Math.min(pageHeight * canvas.width / pdfWidth, canvas.height - sourceY);

    //         //         // Add image chunk to PDF
    //         //         pdf.addImage(
    //         //             imgData,
    //         //             'JPEG',
    //         //             0, // x position
    //         //             20, // y position (below header)
    //         //             pdfWidth, // width
    //         //             sourceHeight * pdfWidth / canvas.width, // height
    //         //             '', // alias
    //         //             'FAST', // compression
    //         //             0, // rotation
    //         //             // sourceY // source y position for cropping
    //         //         );
    //         //     }
    //         // } else {
    //         //     // Just add the full image without headers and footers
    //         //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    //         // }

    //         const loadImageDimensions = (): Promise<{ width: number; height: number }> => {
    //             return new Promise((resolve) => {
    //                 const img = new Image();
    //                 img.src = PdfHeader;
    //                 img.onload = () => {
    //                     resolve({ width: img.naturalWidth, height: img.naturalHeight });
    //                 };
    //             });
    //         };

    //         // Add header and footer to each page if enabled
    //         if (includeHeaderFooter) {
    //             const pdfWidth = pdf.internal.pageSize.getWidth(); // Get PDF width
    //             const pdfHeight = pdf.internal.pageSize.getHeight(); // Get PDF height
    //             const headerImg = await loadImageDimensions();
    //             const footerImg = await loadImageDimensions();

    //             // Scale images to fit PDF width while maintaining aspect ratio
    //             const maxImgWidth = pdfWidth; // Leave some margin
    //             const headerScale = maxImgWidth / headerImg.width;
    //             const footerScale = maxImgWidth / footerImg.width;

    //             const headerImgHeight = headerImg.height * headerScale;
    //             const footerImgHeight = footerImg.height * footerScale;

    //             let yPosition = headerImgHeight; // Start after the header
    //             const availableHeight = pdfHeight - headerImgHeight - footerImgHeight; // Space left for content

    //             const loadImageDimensionsOfImg = (imageSrc: string): Promise<{ width: number; height: number }> => {
    //                 return new Promise((resolve) => {
    //                     const img = new Image();
    //                     img.src = imageSrc;
    //                     img.onload = () => {
    //                         resolve({ width: img.naturalWidth, height: img.naturalHeight });
    //                     };
    //                 });
    //             };

    //             // Load imgData dimensions
    //             const imgDimensions = await loadImageDimensionsOfImg(imgData);
    //             const imgDataWidth = imgDimensions.width;
    //             const imgDataHeight = imgDimensions.height;

    //             // Split image into sections and add to pages
    //             let currentHeight = 0;
    //             while (currentHeight < imgDataHeight) {
    //                 if (currentHeight > 0) {
    //                     pdf.addPage(); // Add new page
    //                     yPosition = headerImgHeight; // Reset y position
    //                 }

    //                 const remainingHeight = imgDataHeight - currentHeight;
    //                 const imageHeight = Math.min(remainingHeight, availableHeight);

    //                 // Add header image
    //                 pdf.addImage(PdfHeader, "PNG", 0, 0, pdfWidth, headerImgHeight);

    //                 // Add image content within available space
    //                 pdf.addImage(imgData, 'JPEG', 0, yPosition, pdfWidth, imageHeight);

    //                 // Add footer image
    //                 pdf.addImage(PdfHeader, "PNG", 0, pdfHeight - footerImgHeight, pdfWidth, footerImgHeight);

    //                 currentHeight += imageHeight; // Move to the next portion
    //             }


    //             // // Add header image
    //             // pdf.addImage(PdfHeader, "PNG", 0, 0, maxImgWidth, headerImgHeight);
    //             // pdf.addImage(imgData, 'JPEG', 0, 80, pdfWidth, pdfHeight);
    //             // // Add footer image
    //             // pdf.addImage(PdfHeader, "PNG", 0, 0, maxImgWidth, footerImgHeight);
    //         } else {
    //             // Just add the full image without headers and footers
    //             pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    //         }

    //         // Add metadata to PDF
    //         pdf.setProperties({
    //             title: `Invoice ${invoiceData.invoiceNumber}`,
    //             subject: 'Invoice',
    //             author: invoiceData.companyInfo.name,
    //             keywords: 'invoice, billing',
    //             creator: 'Invoice Generator'
    //         });

    //         // Save the PDF
    //         pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);

    //         // Clean up temporary elements
    //         document.body.removeChild(tempDiv);

    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //         alert('There was an error generating the PDF. Please try again.');
    //     } finally {
    //         setIsGenerating(false);
    //     }
    // };

    const handleDownloadPdf = async (): Promise<void> => {
        if (!invoiceRef.current) return;

        try {
            setIsGenerating(true);

            // Clone invoice for A4 export
            const clone = invoiceRef.current.cloneNode(true) as HTMLElement;
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '-9999px';

            // Define A4 size (at 96 DPI, ~794px × 1123px)
            const isPortrait = pdfSettings.orientation === 'portrait';
            const width = isPortrait ? '794px' : '1123px';
            clone.style.width = width;
            clone.style.height = 'auto';
            clone.style.maxWidth = 'none';
            clone.style.transform = 'none';
            clone.style.padding = '40px';
            clone.style.boxSizing = 'border-box';

            tempDiv.appendChild(clone);
            document.body.appendChild(tempDiv);

            const scale = pdfSettings.dpi / 96;

            // Generate canvas
            const canvas = await html2canvas(clone, {
                scale: scale,
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const pdf = new jsPDF({
                orientation: pdfSettings.orientation,
                unit: 'mm',
                format: pdfSettings.format
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Scale to fit PDF width
            const scaleFactor = pdfWidth / imgWidth;
            const scaledImgHeight = imgHeight * scaleFactor;

            const loadImageDimensions = (imageSrc: string): Promise<{ width: number; height: number }> => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = imageSrc;
                    img.onload = () => {
                        resolve({ width: img.naturalWidth, height: img.naturalHeight });
                    };
                });
            };

            // Header/Footer setup
            const headerImg = await loadImageDimensions(PdfHeader);
            const footerImg = await loadImageDimensions(pdfFooter);

            const headerScale = pdfWidth / headerImg.width;
            const footerScale = pdfWidth / footerImg.width;

            const headerHeight = headerImg.height * headerScale;
            const footerHeight = footerImg.height * footerScale;

            let yPosition = headerHeight;
            const contentHeight = pdfHeight - headerHeight - footerHeight;

            let currentY = 0;
            let pageIndex = 0;

            while (currentY < scaledImgHeight) {
                if (pageIndex > 0) {
                    pdf.addPage();
                }

                // Add header
                pdf.addImage(PdfHeader, "PNG", 0, 0, pdfWidth, headerHeight);

                // Calculate portion of image to add
                const remainingHeight = scaledImgHeight - currentY;
                const sliceHeight = Math.min(remainingHeight, contentHeight);

                // Crop image and add it to PDF
                const croppedCanvas = document.createElement("canvas");
                croppedCanvas.width = imgWidth;
                croppedCanvas.height = sliceHeight / scaleFactor;

                const ctx = croppedCanvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(canvas, 0, currentY / scaleFactor, imgWidth, croppedCanvas.height, 0, 0, imgWidth, croppedCanvas.height);
                }

                const croppedImgData = croppedCanvas.toDataURL("image/jpeg", 1.0);
                pdf.addImage(croppedImgData, "JPEG", 0, yPosition, pdfWidth, sliceHeight);

                // Add footer
                pdf.addImage(pdfFooter, "PNG", 0, pdfHeight - footerHeight, pdfWidth, footerHeight);

                // Move to next portion
                currentY += sliceHeight;
                pageIndex++;
            }

            pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
            document.body.removeChild(tempDiv);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
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
          <title>Print Invoice ${invoiceData.invoiceNumber}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #333;
              margin: 0;
              padding: 20px;
            }
            /* Reset invoice dimensions for printing */
            #invoice-print {
              transform: none !important;
              max-width: 100% !important;
              width: 210mm !important;
              margin: 0 auto !important;
            }
            /* Header and footer for print */
            .print-header, .print-footer {
              text-align: center;
              color: #666;
              padding: 10px 0;
            }
            .print-header {
              border-bottom: 1px solid #eee;
              margin-bottom: 20px;
            }
            .print-footer {
              border-top: 1px solid #eee;
              margin-top: 20px;
            }
            @media print {
              body {
                padding: 0;
              }
              button {
                display: none;
              }
              .print-header, .print-footer {
                position: fixed;
                width: 100%;
              }
              .print-header {
                top: 0;
              }
              .print-footer {
                bottom: 0;
              }
              #invoice-print {
                margin-top: 40px !important;
                margin-bottom: 40px !important;
              }
            }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 20px;">
            <button onclick="window.print()">Print Invoice</button>
          </div>
          
          ${includeHeaderFooter ? `<div class="print-header">
            <div style="display: flex; justify-content: space-between;">
              <div style="text-align: left; flex: 1;">${headerText}</div>
              <div style="text-align: right; flex: 1;">Invoice #${invoiceData.invoiceNumber}</div>
            </div>
          </div>` : ''}
          
          <div id="invoice-print">
            ${invoiceHtml}
          </div>
          
          ${includeHeaderFooter ? `<div class="print-footer">
            ${footerText}
          </div>` : ''}
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    return (
        <div style={styles.container}>
            {/* Invoice Component - displayed smaller in UI */}
            <Box
                ref={invoiceRef}
                style={styles.invoiceContainer}
            >
                {/* Header with company and invoice info
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
                </div> */}

                {/* Customer Information */}
                <Flex justifyContent={"space-between"}>
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Invoice To:</h2>
                        <p style={styles.customerName}>{invoiceData.customer.name}</p>
                        <p style={styles.customerDetail}>{invoiceData.customer.address}</p>
                        <p style={styles.customerDetail}>{invoiceData.customer.email}</p>
                    </div>
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Invoice From:</h2>
                        <p style={styles.customerName}>Secure Studio</p>
                        <p style={styles.customerDetail}>{invoiceData.customer.address}</p>
                        <p style={styles.customerDetail}>{invoiceData.customer.email}</p>
                    </div>
                </Flex>

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
            </Box>

            {/* PDF Quality Controls */}
            <div style={styles.controlsContainer}>
                <h2 style={styles.controlsTitle}>Download Options</h2>

                {/* Header and Footer Controls */}
                <div style={styles.controlsRow}>
                    <div style={styles.controlGroup} >
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={includeHeaderFooter}
                                onChange={handleIncludeHeaderFooterChange}
                                style={styles.checkbox}
                            />
                            Include header and footer on each page
                        </label>
                    </div>
                </div>

                {includeHeaderFooter && (
                    <div style={styles.controlsRow}>
                        <div style={styles.controlGroup}>
                            <label style={styles.label} htmlFor="header-text">Header Text</label>
                            <input
                                id="header-text"
                                type="text"
                                value={headerText}
                                onChange={handleHeaderTextChange}
                                style={styles.input}
                                placeholder="Enter header text"
                            />
                        </div>
                        <div style={styles.controlGroup} >
                            <label style={styles.label} htmlFor="footer-text">Footer Text</label>
                            <input
                                id="footer-text"
                                type="text"
                                value={footerText}
                                onChange={handleFooterTextChange}
                                style={styles.input}
                                placeholder="Enter footer text"
                            />
                        </div>
                    </div>
                )}

                {/* Paper and Quality Settings */}
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

                <div style={styles.pdfPreviewContainer}>
                    <p>The downloaded PDF will be properly formatted to fit the selected paper size ({pdfSettings.format.toUpperCase()}) in {pdfSettings.orientation} orientation, regardless of how it appears in the UI above.</p>
                    {includeHeaderFooter && <p>Headers and footers will appear on every page of your document.</p>}
                </div>
            </div>
        </div>
    );
};

export default Invoice;