import { Button, Spinner } from '@chakra-ui/react';
import { cancelOrder, createOrder, paymentFail, verifyPayment } from '../../api/payment';
import useServiceCategory from '../../stores/serviceCategory';
import { useState } from 'react';
import { toaster } from "../../components/ui/toaster";
import { useInvoicesStore } from '../../stores/invoice';

const RazorpayPayment = ({ totalAmount, coupon }: any) => {
    const { selectedPlanId, nextStep, setBookingDetails, scheduleCount, durationDates } = useServiceCategory();
    const { previewInvoice } = useInvoicesStore()
    const [loading, setLoading] = useState(false);
    const handlePayment = async () => {
        setLoading(true)
        try {
            let toastId: any = toaster.create({ description: "Ordering...", type: "loading" });
            const response = await createOrder({ planId: selectedPlanId, coupon, scheduleCount });
            const order = await response.data
            const orderId = order.orderId;

            // Get the computed value of --secondary-color
            const rootStyles = getComputedStyle(document.documentElement);
            const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim() || '#006198'; // Default if not found

            // Replace with your Razorpay test key
            const testKey = import.meta.env.RAZORPAY_KEY_ID;

            const options = {
                key: testKey,
                amount: totalAmount * 100, // 50000 paise = ₹500
                currency: 'INR',
                name: 'Secure Studio',
                description: 'Test Transaction',
                "order_id": orderId,
                image: 'https://dev-22neuro.blr1.cdn.digitaloceanspaces.com/Secure-Studio/dev/documents/test/861390f0-991a-4ecf-bf39-753753a2f1b7.png',
                handler: async function (data: any) {
                    let InvoiceId = "";
                    try {
                        toaster.update(toastId, { description: "Payment verifying...", type: "loading" });
                        let response = await verifyPayment({ ...data, bookingId: order.bookingId ,durationDates });
                        InvoiceId = response.data?.invoice?.id
                        setBookingDetails(response.data);
                        nextStep(4);
                        toaster.update(toastId, { description: response.message || "payment verified", type: "success" });
                        setLoading(false);
                    } catch (error: any) {
                        if (error.status === 500) {
                            toaster.update(toastId, { description: error.data.message || "payment verified failed", type: "error" });
                        }
                        setLoading(false);
                    } finally {
                        previewInvoice(InvoiceId);
                    }
                },
                prefill: {
                    name: 'Secure Studio',
                },
                theme: {
                    color: secondaryColor,
                },
                modal: {
                    ondismiss: async () => {
                        try {
                            let canceledResponse = await cancelOrder(order.bookingId);
                            toaster.update(toastId, { description: canceledResponse.message || "Order Cancelled", type: "error" });
                            setLoading(false);
                        } catch (error) {
                            toaster.update(toastId, { description: response.data.message || "Order Cancelled Failed", type: "error" });
                            setLoading(false);
                        }
                    },
                }
            }
            const rzp = new (window as any).Razorpay(options);

            rzp.on('payment.failed', async (response: any) => {
                console.log("razerpay-payment-failed", response);
                await paymentFail(order.bookingId)
            });

            rzp.open();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Button disabled={loading ? true : false} opacity={loading ? 0.8 : 1} onClick={handlePayment} size="lg" mt={4}>
            {loading ? <Spinner /> : "Pay"}
        </Button>
    );
};

export default RazorpayPayment;