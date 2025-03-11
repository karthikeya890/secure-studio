import { useState } from "react";
import { Card, CardBody, Heading, Text, Input, Button, VStack, HStack, Flex, Box } from "@chakra-ui/react";
import RazorpayPayment from "./razerpayment";
import { getCouponDetails } from "../../api/coupon";
import WrongIcon from "../../assets/wrong";
import useServiceStore from "../../stores/services";

const PaymentSummary: React.FC = () => {
    const { selectedPlan, scheduleCount } = useServiceStore();
    const details: any = selectedPlan;
    const price = (selectedPlan?.durationValueSelect === "USER_SELECTED" ? scheduleCount * details?.price : details?.price) || 0;
    let advance: number;
    switch (selectedPlan?.advanceType) {
        case "MONTHS":
            advance = price * selectedPlan?.advanceValue as number
            break;
        case "AMOUNT":
            advance = selectedPlan?.advanceValue as number
            break;

        default:
            advance = 0
            break;
    }
    const taxType = details?.gstType;
    const taxValue = details?.gstValue
    const [coupon, setCoupon] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const [advanceDiscount, setAdvanceDiscount] = useState<number>(0);
    const taxAmount = (taxType === "PERCENTAGE" ? ((price - discount) * taxValue) / 100 : taxValue) || 0;
    const total = ((price - discount) + taxAmount + (advance - advanceDiscount) || 0);

    // Handle coupon code
    const applyCoupon = async () => {
        try {
            const response = await getCouponDetails(coupon, price);
            const data = response?.data;
            const discountFor = data?.discountFor;

            if (discountFor === "ADVANCE") {
                const value = data?.value;
                const valueType = data?.valueType;
                const discount = valueType === "PERCENTAGE" ? (advance * value) / 100 : value;
                setAdvanceDiscount(discount)
            } else {
                const value = data?.value;
                const valueType = data?.valueType;
                const discount = valueType === "PERCENTAGE" ? (price * value) / 100 : value;
                setDiscount(discount);
            }


        } catch (error: any) {
            console.log(error?.data)
        }

    };

    return (
        <Card.Root pointerEvents={selectedPlan?.id ? "all" : "none"} opacity={selectedPlan?.id ? 1 : 0.8}
            border={"2px solid"} borderColor={"gray.200"}
            flexGrow={1} borderRadius={20} >
            <CardBody>
                <VStack gap={6} align="stretch" >
                    <Heading size="lg" textAlign="center" color="dark" mb={4}>
                        Booking Summary
                    </Heading>
                    <Box>
                        <HStack justify="space-between" mb={2}>
                            <Text fontSize="md" color="gray.600">Price:</Text>
                            <Text fontSize="md" fontWeight="bold">₹{(price - discount)?.toFixed(2)}</Text>
                        </HStack>
                        <HStack justify="space-between" mb={4}>
                            <Text fontSize="md" color="gray.600">Discount:</Text>
                            <Text fontSize="md" fontWeight="bold" color="green.500">-₹{discount?.toFixed(2)}</Text>
                        </HStack>
                        <HStack justify="space-between" mb={2}>
                            <Text fontSize="md" color="gray.600">Tax ({taxType ? (taxType === "PERCENTAGE" ? `${taxValue}%` : `₹${taxValue}`) : "0%"}) :</Text>
                            <Text fontSize="md" fontWeight="bold">₹{taxAmount?.toFixed(2)}</Text>
                        </HStack>
                        <HStack justify="space-between" mb={4}>
                            <Text fontSize="md" color="gray.600">Advance:</Text>
                            <Text fontSize="md" fontWeight="bold">₹{(advance - advanceDiscount)?.toFixed(2)}</Text>
                        </HStack>

                        <Box borderTopWidth="1px" borderColor="gray.200" pt={4}>
                            <HStack justify="space-between">
                                <Text fontSize="lg" fontWeight="bold">Total:</Text>
                                <Text fontSize="lg" fontWeight="bold">₹{total?.toFixed(2)}</Text>
                            </HStack>
                        </Box>
                    </Box>
                    <Flex gap={2} mt={4}>
                        <Input disabled={discount > 0 || advanceDiscount > 0 ? true : false} pointerEvents={discount > 0 || advanceDiscount > 0 ? "none" : ""} flex={4} placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} _focus={{ borderColor: "primary" }} borderRadius="md" />
                        <Button flex={1} bg={discount > 0 || advanceDiscount > 0 ? "green" : ""} disabled={discount > 0 || advanceDiscount > 0 ? true : false} pointerEvents={discount > 0 || advanceDiscount > 0 ? "none" : ""} onClick={applyCoupon} borderRadius="md" _hover={{ transform: "scale(1.05)" }} transition="all 0.2s">
                            {discount > 0 || advanceDiscount > 0 ? "Applied" : "Apply"}
                        </Button>
                        {discount > 0 || advanceDiscount > 0 && <Button variant={"ghost"} onClick={() => {
                            setDiscount(0)
                            setAdvanceDiscount(0)
                            setCoupon("")
                        }} >
                            {WrongIcon()}
                        </Button>}

                    </Flex>
                    <RazorpayPayment totalAmount={total} coupon={discount > 0 || advanceDiscount > 0 ? coupon : null} />
                </VStack>
            </CardBody>
        </Card.Root >
    );
};

export default PaymentSummary;