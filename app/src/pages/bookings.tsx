import { HStack, Heading, Stack, Table, Spinner, Badge, Flex } from "@chakra-ui/react";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../components/ui/pagination";
import { useEffect } from "react";
import { useBookingsStore } from "../stores/booking";
import { convertDateSecondaryStyle } from "../utils/date";
const getBadgeColor = (status: string): string => {
    switch (status) {
        case "CONFIRMED":
            return "green";
        case "CANCELLED":
            return "red";
        case "PENDING":
            return "yellow";
        case "FAILED":
            return "gray";
        default:
            return "blue";
    }
};

const Bookings = () => {
    const { bookings, page, pageSize, totalPages, loading, fetchBookings, setPage } = useBookingsStore();

    useEffect(() => {
        fetchBookings(page);
    }, [page]);

    return (
        <Stack width="full" gap="5" flexGrow={1} bg={'white'} p={[2, 5]} borderRadius={25} boxShadow={"2xl"} >
            <Heading size="xl">Bookings</Heading>
            {loading ? (
                <Flex justifyContent={"center"} alignItems={"center"} flexGrow={1} ><Spinner size="lg" alignSelf="center" /></Flex>
            ) : bookings.length > 0 ? (
                <Table.Root size="sm" variant={"outline"} rounded={"md"} >
                    <Table.Header>
                        <Table.Row  >
                            <Table.ColumnHeader p={5} fontSize={"md"} textAlign={"center"}>S.No.</Table.ColumnHeader>
                            <Table.ColumnHeader p={5} fontSize={"md"}>Service</Table.ColumnHeader>
                            <Table.ColumnHeader p={5} fontSize={"md"} >Payment Code</Table.ColumnHeader>
                            <Table.ColumnHeader p={5} fontSize={"md"} >Duration</Table.ColumnHeader>
                            <Table.ColumnHeader p={5} fontSize={"md"} >Start Time</Table.ColumnHeader>
                            <Table.ColumnHeader p={5} fontSize={"md"} >End Time</Table.ColumnHeader>
                            <Table.ColumnHeader p={5} fontSize={"md"} textAlign={"center"}>Status</Table.ColumnHeader>
                            <Table.ColumnHeader p={5} fontSize={"md"} >Price</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {bookings.map((item, index) => (
                            <Table.Row key={item.id} h={14} >
                                <Table.Cell py={3} px={2} textAlign={"center"}>{index + 1}&#41;</Table.Cell>
                                <Table.Cell py={3} px={5}>{item.service.name}</Table.Cell>
                                <Table.Cell py={3} px={5} >{item.payment.code}</Table.Cell>
                                <Table.Cell py={3} px={5} >{item.subscription.defaultValue} {item.subscription.duration}</Table.Cell>
                                <Table.Cell py={3} px={5} >{convertDateSecondaryStyle(item.startTime)}</Table.Cell>
                                <Table.Cell py={3} px={5} >{convertDateSecondaryStyle(item.endTime)}</Table.Cell>
                                <Table.Cell py={3} px={5} textAlign={"center"}>
                                    <Badge colorPalette={getBadgeColor(item.status)}>{item.status}</Badge>
                                </Table.Cell>
                                <Table.Cell py={3} px={5} >₹{item.payment.amount}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            ) : <Flex justifyContent={"center"} alignItems={"center"} flexGrow={1} >No Data Found</Flex>
            }

            <PaginationRoot
                alignSelf={"end"}
                count={totalPages}
                pageSize={pageSize}
                defaultPage={page}
                variant="solid"
                onPageChange={(e) => {
                    setPage(e.page)
                }}
            >
                <HStack wrap="wrap">
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
        </Stack>
    );
};

export default Bookings;
