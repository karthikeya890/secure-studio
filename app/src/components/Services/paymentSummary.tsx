import { useState } from "react";
import { Card, CardBody, Heading, Text, Input, Button, VStack, HStack, Flex, Box } from "@chakra-ui/react";
import RazorpayPayment from "./Razerpayment";
import useServiceCategory from "../../stores/serviceCategory";
import { getCouponDetails } from "../../api/coupon";
import WrongIcon from "../../assets/wrong";

const PaymentSummary: React.FC = () => {
    const { planDetails, scheduleCount } = useServiceCategory();
    const details: any = planDetails;
    const price = planDetails?.durationValueSelect === "USER_SELECTED" ? scheduleCount * details?.price : details?.price;
    const taxType = details.gstType;
    const taxValue = details.gstValue
    const [coupon, setCoupon] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const taxAmount = taxType === "PERCENTAGE" ? ((price - discount) * taxValue) / 100 : taxValue;
    const total = (price - discount) + taxAmount;

    // Handle coupon code
    const applyCoupon = async () => {
        try {
            const response = await getCouponDetails(coupon, price);
            const data = response.data;
            const value = data.value;
            const valueType = data.valueType;
            const discount = valueType === "PERCENTAGE" ? (price * value) / 100 : value;
            setDiscount(discount);
        } catch (error: any) {
            console.log(error.data)
        }

    };

    return (
        <Card.Root p={6} shadow="xl" borderWidth="1px" borderRadius="2xl" w="400px" bg="white" transition="all 0.2s" _hover={{ shadow: "2xl" }}>
            <CardBody>
                <VStack gap={6} align="stretch">
                    <Heading size="lg" textAlign="center" color="dark" mb={4}>
                        Payment Summary
                    </Heading>

                    <Box>
                        <HStack justify="space-between" mb={2}>
                            <Text fontSize="md" color="gray.600">Price:</Text>
                            <Text fontSize="md" fontWeight="bold">₹{(price - discount).toFixed(2)}</Text>
                        </HStack>
                        <HStack justify="space-between" mb={4}>
                            <Text fontSize="md" color="gray.600">Discount:</Text>
                            <Text fontSize="md" fontWeight="bold" color="green.500">-₹{discount.toFixed(2)}</Text>
                        </HStack>
                        <HStack justify="space-between" mb={2}>
                            <Text fontSize="md" color="gray.600">Tax ({taxType === "PERCENTAGE" ? `${taxValue}%` : `₹${taxValue}`}):</Text>
                            <Text fontSize="md" fontWeight="bold">₹{taxAmount.toFixed(2)}</Text>
                        </HStack>
                        <Box borderTopWidth="1px" borderColor="gray.200" pt={4}>
                            <HStack justify="space-between">
                                <Text fontSize="lg" fontWeight="bold">Total:</Text>
                                <Text fontSize="lg" fontWeight="bold">₹{total.toFixed(2)}</Text>
                            </HStack>
                        </Box>
                    </Box>

                    <Flex gap={2} mt={4}>
                        <Input disabled={discount > 0 ? true : false} pointerEvents={discount > 0 ? "none" : ""} flex={4} placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} _focus={{ borderColor: "primary" }} borderRadius="md" />
                        <Button flex={1} bg={discount > 0 ? "green" : ""} disabled={discount > 0 ? true : false} pointerEvents={discount > 0 ? "none" : ""} onClick={applyCoupon} borderRadius="md" _hover={{ transform: "scale(1.05)" }} transition="all 0.2s">
                            {discount > 0 ? "Applied" : "Apply"}
                        </Button>
                        {discount > 0 && <Button variant={"ghost"} onClick={() => {
                            setDiscount(0)
                            setCoupon("")
                        }} >
                            {WrongIcon()}
                        </Button>}

                    </Flex>
                    {total && <RazorpayPayment totalAmount={total} coupon={discount > 0 ? coupon : null} />}

                </VStack>
            </CardBody>
        </Card.Root>
    );
};

export default PaymentSummary;