import { Flex, Text, Breadcrumb, Spinner } from "@chakra-ui/react"
import useServiceStore from "../../stores/services"
import { useEffect } from "react";
import { toaster } from "../ui/toaster";
import PaymentSummary from "../bookService/bookingSummary";
import { NavLink } from "react-router-dom";
import BookingTabs from "./tabs";

const SelectServiceStep = () => {
    const { getAllServiceCategories, reset, selectedServiceCategory} = useServiceStore();

    useEffect(() => {
        getAllServiceCategories()
            .catch(error => {
                toaster.create(
                    {
                        description: error?.data?.message || "Failed to fetch service Categories",
                        type: "error"
                    })
            }
            );
        return () => reset()
    }, []);

    return (
        <Flex flexDir={"column"} fontSize={18} gap={5} flexGrow={1} overflowY={"auto"} bg={"white"} borderRadius={25} p={5}  >
            <Flex justifyContent={"space-between"} alignItems={"center"} >
                <Breadcrumb.Root size={"lg"}>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <NavLink to={"/subscriptions"} end>{({ isActive }) => (<Text fontWeight={isActive ? "bold" : ""} color={isActive ? "dark" : ""} >Subscriptions</Text>)}</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item >
                            <NavLink to={"/subscriptions/book"} end>{({ isActive }) => (<Text fontWeight={isActive ? "bold" : ""} color={isActive ? "dark" : ""} >New Subscription</Text>)}</NavLink>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </Flex>
            <Flex gap={5} flexGrow={1} overflowY={"auto"}>
                <Flex position={"relative"} flexDir={"column"} gap={5} bg={"white"} flexGrow={1} w={"70%"} p={5} border={"2px solid"} borderColor={"gray.200"} borderRadius={20} overflowY={"auto"}>
                    {selectedServiceCategory?.id ? <BookingTabs /> : <Flex justifyContent={"center"} alignItems={"center"} flexGrow={1} ><Spinner size="lg" alignSelf="center" /></Flex>}
                </Flex>
                <Flex gap={5} bg={"white"} w={"30%"} borderRadius={20} alignItems={"start"}  >
                    <PaymentSummary />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SelectServiceStep;