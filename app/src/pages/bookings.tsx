import { HStack, Breadcrumb, Stack, Table, Spinner, Badge, Flex, Button } from "@chakra-ui/react";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../components/ui/pagination";
import { useEffect } from "react";
import { useBookingsStore } from "../stores/booking";
import { convertDateSecondaryStyle } from "../utils/date";
import { Tooltip } from "../components/ui/tooltip";
import Eye from "../assets/eye";

const getBadgeColor = (status: string): string => {
    switch (status) {
        case "COMPLETED":
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
        <Stack width="full" gap="5" flexGrow={1} bg={'white'} p={[2, 5]} borderRadius={25} overflowY={"auto"}  >
            <Flex justifyContent={"space-between"} alignItems={"center"} >
                <Breadcrumb.Root size={"lg"}>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="#">Services</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.CurrentLink>Book Service</Breadcrumb.CurrentLink>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
                <Button borderRadius={25} bg={"blackAlpha.900"} >Book service</Button>
            </Flex>
            <Flex gap={2} flexGrow={1} overflowY={"auto"} flexDir={"column"} justifyContent={"space-between"}>
                {loading ? (
                    <Flex justifyContent={"center"} alignItems={"center"} flexGrow={1} ><Spinner size="lg" alignSelf="center" /></Flex>
                ) : bookings.length > 0 ? (
                    <Table.ScrollArea borderWidth="1px" rounded="md" >
                        <Table.Root size="sm" rounded={"md"} stickyHeader={true}  >
                            <Table.Header >
                                <Table.Row bg={"gray.100"}  >
                                    <Table.ColumnHeader p={5} fontSize={"md"} textAlign={"center"}>S.No.</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"} >Booking Code</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"}>Service</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"} >Start Time</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"} >End Time</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"} >Price</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"} textAlign={"center"}>Payment Status</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"} textAlign={"center"}>Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body >
                                {bookings.map((item, index) => (
                                    <Table.Row bg={index % 2 == 0 ? "" : "gray.100"} key={item.id} h={1} >
                                        <Table.Cell py={3} px={2} textAlign={"center"}>{index + 1}&#41;</Table.Cell>
                                        <Table.Cell py={3} px={5} >{item.code}</Table.Cell>
                                        <Table.Cell py={3} px={5}>{item.service.name}</Table.Cell>
                                        <Table.Cell py={3} px={5} > <Badge >{convertDateSecondaryStyle(item.startTime)}</Badge></Table.Cell>
                                        <Table.Cell py={3} px={5} ><Badge >{convertDateSecondaryStyle(item.endTime)}</Badge></Table.Cell>
                                        <Table.Cell py={3} px={5} ><Badge colorPalette="blue">₹{item.invoice.totalAmount}</Badge></Table.Cell>
                                        <Table.Cell py={3} px={5} textAlign={"center"}>
                                            <Badge colorPalette={getBadgeColor(item.payment.status)}>{item.payment.status}</Badge>
                                        </Table.Cell>
                                        <Table.Cell py={3} px={5} textAlign={"center"} >
                                            <Tooltip openDelay={100} positioning={{ placement: "bottom" }} content="View Details">
                                                <Button p={0} h={8} bg={"support"} variant={"ghost"}>{Eye("25", "25", "white")}</Button>
                                            </Tooltip>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Table.ScrollArea>
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
            </Flex>
        </Stack >
    );
};

export default Bookings;
