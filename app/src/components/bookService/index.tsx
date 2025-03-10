import { Flex, Span, Text, Breadcrumb } from "@chakra-ui/react"
import useServiceStore from "../../stores/services"
import { useEffect } from "react";
import { toaster } from "../ui/toaster";
import Schedule from "./schedule";
import SelectCategory from "./selectcategory";
import SelectService from "./selectService";
import SelectPlan from "./selectPlan";
import PaymentSummary from "./bookingSummary";
import { NavLink } from "react-router-dom";
const SelectServiceStep = () => {
    const { getAllServiceCategories, reset } = useServiceStore();

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
                            <NavLink to={"/services"} end>{({ isActive }) => (<Text fontWeight={isActive ? "bold" : ""} color={isActive ? "dark" : ""} >Services</Text>)}</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item >
                            <NavLink to={"/services/book"} end>{({ isActive }) => (<Text fontWeight={isActive ? "bold" : ""} color={isActive ? "dark" : ""} >Book service</Text>)}</NavLink>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </Flex>
            <Flex gap={5} flexGrow={1} overflowY={"auto"}>
                <Flex position={"relative"} flexDir={"column"} gap={5} bg={"white"} flexGrow={1} w={"70%"} p={5} border={"2px solid"} borderColor={"gray.200"} borderRadius={20} overflowY={"auto"}>
                    {/* categories */}
                    <Flex flexDir={"column"} gap={5} >
                        <Text fontSize={"1em"} fontWeight={"500"} >Select Category</Text>
                        <SelectCategory />
                    </Flex>
                    {/* services */}
                    <Flex flexDir={"column"} gap={5} >
                        <Text fontSize={"1em"} fontWeight={"500"} >Select Service</Text>
                        <SelectService />
                    </Flex>
                    {/* plans */}
                    <Flex flexDir={"column"} gap={5} border={"2px solid gray.500"}>
                        <Text fontSize={"1em"} fontWeight={"500"} >Select Plan</Text>
                        <SelectPlan />
                    </Flex>
                    {/* schedule */}
                    <Flex p={5} flexDir={"column"} >
                        <Text fontSize={"1em"} fontWeight={"500"} >Schedule Service</Text>
                        <Schedule />
                    </Flex>
                    <Span id="end"></Span>
                </Flex>
                <Flex gap={5} bg={"white"} w={"30%"} borderRadius={20} alignItems={"start"}  >

                    <PaymentSummary />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SelectServiceStep;