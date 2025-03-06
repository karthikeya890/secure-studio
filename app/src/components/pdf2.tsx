import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice: React.FC = () => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = async (): Promise<void> => {
        if (!invoiceRef.current) return;

        try {
            setIsGenerating(true);
            const canvas = await html2canvas(invoiceRef.current, { scale: 2, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth * ratio, imgHeight * ratio);
            pdf.save('invoice.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            {/* Download Button */}
            <button onClick={handleDownloadPdf} disabled={isGenerating} style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', fontSize: '16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                {isGenerating ? 'Generating PDF...' : 'Download Invoice as PDF'}
            </button>

            {/* Hidden Invoice (not visible in UI) */}
            <div ref={invoiceRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <h1>Invoice #INV-2025-001</h1>
                <p>Date: 2025-03-06</p>
                <p>Customer: John Doe</p>
                <p>Amount: $3597</p>
            </div>
        </div>
    );
};

export default Invoice;
