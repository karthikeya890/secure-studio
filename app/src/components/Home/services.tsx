import { useEffect } from "react";
import { useHomeStore } from "../../stores/home";
import { Flex, Text, Card, Button, Span } from "@chakra-ui/react";
import TickIcon from "../../assets/tick";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth";
const Services = () => {
    const navigate = useNavigate();
    const { fetchServicesCategories, servicesCategories, selectCategory, selectedCategory, filteredServices } = useHomeStore();
    const { setAfterLoginGotTo } = useAuthStore();
    useEffect(() => {
        (async function () {
            try {
                await fetchServicesCategories()
            } catch (error: any) {
                console.log(error.data)
            }
        })();

    }, [])

    return (
        <Flex id="services" direction={"column"} p={[5, 7, 10]} bg={"rgb(237 233 254)"} gap={[5, 10]} alignItems={"center"} >
            <Text fontSize={[15, 20, 40]} fontWeight={"bold"} color={"dark"} >Our Premium Services</Text>
            <Text w={["100%", "80%", "60%", "40%"]} textAlign={"center"} fontSize={["sm", "lg"]} fontWeight={"500"} color={"blackAlpha.700"} >
                Choose from our carefully curated service packages designed to meet your specific needs
            </Text>
            <Flex gap={5} flexWrap={"wrap"} justifyContent={"center"}>
                {servicesCategories.map((category: any) => {
                    return (
                        <Button onClick={() => selectCategory(category.id)} bg={selectedCategory === category.id ? "secondary" : "blackAlpha.800"} boxShadow={selectedCategory === category.id ? "2xl" : "xl"} borderRadius={20} >
                            {category.name}
                        </Button>
                    )
                })}
            </Flex>
            <Flex gap={10} p={[0, 0, 5]} flexWrap={'wrap'} justifyContent={"center"}   >
                {
                    filteredServices.map((service: any) => {
                        return <Card.Root minH={300} minW={["100%", "80%", 360]} borderRadius={15} boxShadow={"xl"} flexWrap={"wrap"} >
                            <Card.Body gap={5} p={0} >
                                <Card.Title p={7} bg={"support"} borderTopRadius={15} fontSize={"xl"} color={"whiteAlpha.900"} >
                                    <Text>{service.name}</Text>
                                    <Text>{service.description}</Text>
                                </Card.Title>
                                <Card.Description p={5} display={"flex"} flexDir={"column"} gap={3} flexGrow={1} >
                                    {/* Subscriptions inside each service */}
                                    <Flex mt={3} gap={5} flexDir={"column"}>
                                        {service.subscriptions.map((item: any) => {
                                            return <Flex flexDir={"column"} gap={2} >
                                                <Flex w={"100%"} color={"blackAlpha.800"} justifyContent={"space-between"}>
                                                    <Text fontSize={"md"} fontWeight={"bold"}>{item.duration[0] + item.duration.toLowerCase().slice(1, item.duration.length)} Plan</Text>
                                                    <Text fontSize={"lg"} fontWeight={"bold"} >₹{item.price}</Text>
                                                </Flex>
                                                {
                                                    item.features.map((feature: any) => (<Flex alignItems={"center"} > <Span> {TickIcon("30", "", "green")}</Span> <Text fontSize={"md"}> {feature}</Text></Flex>))
                                                }
                                            </Flex>
                                        })}
                                    </Flex>
                                </Card.Description>
                            </Card.Body>
                            <Card.Footer p={5}  >
                                <Button onClick={() => {
                                    setAfterLoginGotTo("/services");
                                    navigate("/bookings");
                                }} bg={"blackAlpha.900"} w={"100%"} borderRadius={10} >Book Now</Button>
                            </Card.Footer>
                        </Card.Root>
                    })
                }
            </Flex>
            {/* <Flex direction={"column"} gap={10} flexWrap={"wrap"}>
                {servicesCategories.map((category: any) => {
                    return (
                        <Flex boxShadow={"md"} border={"1px solid"} borderRadius={10} borderColor={"gray.200"} bg={"white"} flexWrap={"wrap"} gap={5} direction={"column"}>
                            <Flex px={7} py={5} borderBottom={"1px solid"} borderColor={"gray.200"}  >
                                <Text fontSize={"2xl"} fontWeight={"bold"} color={"dark"} >{category.name}</Text>
                            </Flex>
                            <Flex gap={5} p={5} justifyContent={"center"} alignItems={"center"}  >
                                {
                                    category.services.map((service: any) => {
                                        return <Card.Root bg={"linear-gradient(135deg, #abdcff, #0396ff)"} opacity={service.subscriptions.length > 1 ? 1 : 0.8} height={"100%"} minH={200} minW={400} borderRadius={10} boxShadow={"xl"} flexWrap={"wrap"} >
                                            <Card.Body gap={5}>
                                                <Flex gap={5} alignItems={"center"}>
                                                    <Card.Title mt="2" fontSize={"xl"} >{service.name}</Card.Title>
                                                </Flex>
                                                <Card.Description display={"flex"} flexDir={"column"} gap={3} flexGrow={1} >
                                                    {service.subscriptions.length > 1 ? service.subscriptions.map((item: any) => {
                                                        return (
                                                            <Flex borderRadius={5} p={3} bg={"gray.200"} color={"blackAlpha.900"} justifyContent={"space-between"}>
                                                                <Text fontSize={"sm"} fontWeight={"500"}>{item.name}</Text>
                                                                <Text fontSize={"md"} fontWeight={"bold"} >₹{item.price}</Text>
                                                            </Flex>
                                                        )
                                                    }) : <Flex flexGrow={1} justifyContent={"center"} alignItems={"center"} color={"blackAlpha.500"} >
                                                        <Text fontSize={"2xl"} fontWeight={"500"}>Null</Text>
                                                    </Flex>}
                                                </Card.Description>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button bg={service.subscriptions.length > 1 ? "#0d6efd" : "gray"} w={"100%"} >Book Now</Button>
                                            </Card.Footer>
                                        </Card.Root>
                                    })
                                }
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex> */}
        </Flex>
    )
}

export default Services