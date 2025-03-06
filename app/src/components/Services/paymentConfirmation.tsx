import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/react"
// import Invoice from "../../assets/invoice.png"
import TickIcon from "../../assets/tick"
import useServiceCategory from "../../stores/serviceCategory"
import { useInvoicesStore } from "../../stores/invoice"
import { convertDatePrimaryStyle } from "../../utils/date"
const PaymentConfirmation = () => {

    const { bookingDetails } = useServiceCategory();
    const { invoicePreview, downloadPreviewInvoice } = useInvoicesStore();
    const user = bookingDetails?.user;
    const payment = bookingDetails?.payment;

    return (
        <Flex bg={"white"} borderRadius={25} p={5} gap={5} flexGrow={1} direction={{ base: "column", lg: "row" }} justifyContent={"center"}  >
            <Flex gap={5} direction={"column"} alignItems={"center"} boxShadow={"2xl"} p={5} borderRadius={10} w={{ base: "100%", lg: "65%" }} border={"2px solid"} borderColor={"gray.200"} >
                <Flex gap={5} direction={"column"} w={"100%"} h={"100%"}>
                    <Flex gap={5} w={"auto"} bg={"green.100"} borderRadius={5} p={5} >
                        <Flex h={10} w={10} borderRadius={5} bg={"white"} alignItems={"center"} justifyContent={"center"}>
                            {TickIcon("30px", "30px", "green")}
                        </Flex>
                        <Flex h={10} alignItems={"center"}>
                            <Text fontWeight={"bold"}>Your booking is confirmed</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={5} direction={"column"} border={"2px solid"} borderColor={"gray.200"} p={10} borderRadius={10} flexGrow={1} >
                        <Text fontWeight={"bold"} >Booking details</Text>
                        <Flex gap={10} flexWrap={"wrap"} >
                            <Flex gap={5} minW={200} direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"} >name</Text>
                                <Text fontSize={"md"} fontWeight={"bold"} >{user?.name || "Not-Provided"}</Text>
                            </Flex>
                            <Flex gap={5} minW={200} direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"}>start date</Text>
                                <Text fontSize={"md"} fontWeight={"bold"} >{convertDatePrimaryStyle(bookingDetails?.startTime)}</Text>
                            </Flex>
                            <Flex gap={5} minW={200} direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"}>end date</Text>
                                <Text fontSize={"md"} fontWeight={"bold"} >{convertDatePrimaryStyle(bookingDetails?.endTime)}</Text>
                            </Flex>
                            <Flex gap={5} minW={200} direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"}>Payment code</Text>
                                <Text fontSize={"md"} fontWeight={"bold"} >{payment?.code || "Not-Provided"}</Text>
                            </Flex>
                            <Flex gap={5} minW={200} direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"} >Booking code</Text>
                                <Text fontSize={"md"} fontWeight={"bold"} >{bookingDetails?.code || "Not-Provided"}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex gap={5} boxShadow={"2xl"} p={5} borderRadius={10} w={{ base: "100%", lg: "35%" }} border={"2px solid"} borderColor={"gray.200"} alignItems={"center"} direction={"column"} >
                <Flex boxShadow={"xl"} borderRadius={10} border={"2px solid"} borderColor={"gray.200"} w={"100%"}>
                    {!invoicePreview ? <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} p={5} minH={200}  ><Spinner /></Flex> : <Image w={"100%"} src={invoicePreview} />}
                </Flex>
                <Button disabled={!invoicePreview ? true : false} opacity={!invoicePreview ? "0.8" : "1"} bg={"support"} onClick={() => downloadPreviewInvoice(bookingDetails?.invoice?.id)} >Download Invoice</Button>
            </Flex>
        </Flex>
    )
}

export default PaymentConfirmation