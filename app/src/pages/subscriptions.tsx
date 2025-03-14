import { HStack, Breadcrumb, Stack, Table, Spinner, Badge, Flex, Button, Text } from "@chakra-ui/react";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../components/ui/pagination";
import { useEffect } from "react";
import { useBookingsStore } from "../stores/booking";
import { convertDateSecondaryStyle, getTimeLeft } from "../utils/date";
import { Tooltip } from "../components/ui/tooltip";
import Eye from "../assets/eye";
import { NavLink } from "react-router-dom";

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

const Services = () => {
    const { subscriptions, page, pageSize, totalPages, loading, fetchActiveBookings, setPage } = useBookingsStore();

    useEffect(() => {
        fetchActiveBookings(page);
    }, [page]);

    return (
        <Stack width="full" gap="5" bg={'white'} p={[2, 5]} borderRadius={25} flexGrow={1} overflowY={"auto"} >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Breadcrumb.Root size={"lg"}>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <NavLink to={"/subscriptions"} end >{({ isActive }) => (<Text fontWeight={isActive ? "bold" : ""} color={isActive ? "dark" : ""} >Subscriptions</Text>)}</NavLink>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
                <NavLink to={"/subscriptions/book"} ><Button borderRadius={25} bg={"blackAlpha.900"} >New Subscription</Button></NavLink>
            </Flex>
            <Flex gap={2} flexGrow={1} overflowY={"auto"} flexDir={"column"} justifyContent={"space-between"}>
                {loading ? (
                    <Flex justifyContent={"center"} alignItems={"center"} flexGrow={1} ><Spinner size="lg" alignSelf="center" /></Flex>
                ) : subscriptions.length > 0 ? (
                    <Table.ScrollArea borderWidth="1px" rounded="md" >
                        <Table.Root size="sm" rounded={"md"} stickyHeader={true}  >
                            <Table.Header >
                                <Table.Row bg={"gray.100"}  >
                                    <Table.ColumnHeader p={5} fontSize={"md"} textAlign={"center"}>S.No.</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"}>Service</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"}  >Start Time</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"}  >End Time</Table.ColumnHeader>
                                    <Table.ColumnHeader p={5} fontSize={"md"}  >Expires In</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body >
                                {subscriptions.map((item, index) => (
                                    <Table.Row bg={index % 2 == 0 ? "" : "gray.100"} key={item.id} h={1} >
                                        <Table.Cell py={3} px={2} textAlign={"center"}>{index + 1}&#41;</Table.Cell>
                                        <Table.Cell py={3} px={5}>{item.service.name}</Table.Cell>
                                        <Table.Cell py={3} px={5}  > <Badge >{convertDateSecondaryStyle(item.startTime)}</Badge></Table.Cell>
                                        <Table.Cell py={3} px={5}  ><Badge >{convertDateSecondaryStyle(item.endTime)}</Badge></Table.Cell>
                                        <Table.Cell py={3} px={5}  ><Badge colorPalette={item?.isStarted ? "red" : "blue"} >{item?.timeLeft}</Badge></Table.Cell>
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

        </Stack>
    );

};

export default Services;
