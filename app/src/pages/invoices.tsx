import { HStack, Heading, Stack, Table, Spinner, Badge, Flex, Button } from "@chakra-ui/react";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../components/ui/pagination";
import { useEffect } from "react";
import { useInvoicesStore } from "../stores/invoice";
import Download from "../assets/download";
import { Tooltip } from "../components/ui/tooltip";
import { convertDatePrimaryStyle } from "../utils/date";


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

const Invoices = () => {
    const { invoices, page, pageSize, totalPages, loading, fetchInvoices, setPage, downloadLoding, downloadInvoice, downloadInvoiceId } = useInvoicesStore();

    useEffect(() => {
        fetchInvoices(page);
    }, [page]);

    return (
        <Stack width="full" gap="5" flexGrow={1} bg={'white'} p={[2, 5]} borderRadius={25} boxShadow={"2xl"}>
            <Heading size="xl">Invoices</Heading>
            {loading ? (
                <Flex justifyContent={"center"} alignItems={"center"} flexGrow={1} ><Spinner size="lg" alignSelf="center" /></Flex>
            ) : invoices.length > 0 ? (
                <Table.Root size="sm" variant={"outline"} rounded={"md"} >
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"} textAlign={"center"}>S.No.</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"}>booking code</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"}>totalAmount</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"}>discount</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"}>taxAmount</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"}>finalAmount</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"} textAlign={"center"} >paymentSatus</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"} textAlign={"center"} >paymentDate</Table.ColumnHeader>
                            <Table.ColumnHeader color={"dark"} fontWeight={"bold"} p={5} fontSize={"md"} textAlign={"center"} >actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {invoices.map((item, index) => (
                            <Table.Row key={index} h={14} >
                                <Table.Cell py={3} px={2} textAlign={"center"} w={5}  >{index + 1}&#41;</Table.Cell>
                                <Table.Cell py={3} px={5}>{item.booking.code}</Table.Cell>
                                <Table.Cell py={3} px={5}>₹{item.totalAmount}</Table.Cell>
                                <Table.Cell py={3} px={5}>₹{item.discount || "0"}</Table.Cell>
                                <Table.Cell py={3} px={5}>₹{item.taxAmount}</Table.Cell>
                                <Table.Cell py={3} px={5}>₹{item.finalAmount.toFixed(2)}</Table.Cell>
                                <Table.Cell py={3} px={5} textAlign={"center"}><Badge colorPalette={getBadgeColor(item.booking.payment.status)}>{item.booking.payment.status}</Badge></Table.Cell>
                                <Table.Cell py={3} px={5} textAlign={"center"}>{convertDatePrimaryStyle(item.booking.payment.createdAt)}</Table.Cell>
                                <Table.Cell py={3} px={5} textAlign={"center"} >
                                    <Tooltip openDelay={100} positioning={{ placement: "bottom" }} content="Download">
                                        <Button onClick={() => { downloadInvoice(item.id) }} h={8} bg={"support"} variant={"ghost"}>{downloadLoding && (downloadInvoiceId === item.id) ? <Spinner size={"sm"} color={"white"} /> : Download("25", "25", "white")}</Button>
                                    </Tooltip>
                                </Table.Cell>
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

export default Invoices;
