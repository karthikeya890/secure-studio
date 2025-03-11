import { Flex, Card, Button, Separator, Image, Text, Span, Box } from "@chakra-ui/react"
import useServiceStore from "../../stores/services"
import CheckCircle from "../../assets/checkCircle.svg"
import CurrencyIcon from "../../assets/currency"


const PlanCard = () => {
    const { selectedPlans, setSelectedPlan, selectedPlan } = useServiceStore();
    return (
        <Flex justifyContent={"center"} flexWrap={"wrap"} gap={5}>
            {selectedPlans.length > 0 &&
                selectedPlans?.map((plan: any) => {
                    const savePercentage = plan.savePercentage;
                    const save = savePercentage > 0;
                    return (
                        <Card.Root position={"relative"} key={plan?.id} width="300px" borderRadius={25} borderColor={save ? "dark" : "auto"} borderWidth={save ? 2 : 1} >
                            {
                                save && <Span h={8} display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={"0.8em"} w={85} color={"white"} p={1} textAlign={"center"}
                                    borderRadius={15} fontWeight={"400"} bg={"dark"} pos={"absolute"} right={10} top={-4} >Save {savePercentage}%</Span>
                            }
                            <Card.Header>
                                <Card.Title>{plan?.service?.name}</Card.Title>
                                <Flex alignItems={"center"} gap={1}>
                                    <Flex alignItems={"center"}  >
                                        {CurrencyIcon("25", "25")}
                                        <Text fontWeight={"bold"} fontSize={"1.5em"} color={"darkLight"} >{plan.price}</Text>
                                    </Flex>
                                    <Text fontWeight={"500"} fontSize={"0.8em"} color={"gray"} mt={2}>
                                        /{plan.defaultValue} {plan.defaultValue > 1 ? ` ${plan.duration.toLowerCase()}s` : `${plan.duration.toLowerCase()}`}
                                    </Text>
                                </Flex>
                                {save && <Flex gap={2}>
                                    <Flex pos={"relative"} alignItems={"center"} color={"gray"}>
                                        <Box right={-0.5} pos={"absolute"} bg={"gray"} h={0.5} w={"100%"} ></Box>
                                        {CurrencyIcon("16", "16", "gray")}
                                        <Text fontSize={"0.9em"} fontWeight={"500"} >{plan.price + plan.price * (savePercentage / 100)}</Text>
                                    </Flex>
                                    <Flex alignItems={"center"} color={"green.500"}>
                                        <Text fontSize={"0.9em"} fontWeight={"500"} >Save</Text>
                                        {CurrencyIcon("16", "16", "#22c55e")}
                                        <Text fontSize={"0.9em"} fontWeight={"500"} >{plan.price * (savePercentage / 100)}</Text>
                                    </Flex>
                                </Flex>}
                                <Separator />
                            </Card.Header>
                            <Card.Body gap="6">
                                <Card.Description as={"div"} display={"flex"} flexDir={"column"} gap={2}>
                                    {
                                        plan?.features.map((feature: any, index: any) => {
                                            return <Flex key={index} gap={3} alignItems={"center"}>
                                                <Image src={CheckCircle} h={23} />
                                                <Text>{feature}</Text>
                                            </Flex>
                                        })
                                    }
                                </Card.Description>
                            </Card.Body>
                            <Card.Footer display={"flex"} >
                                <Button flexGrow={1} onClick={() => setSelectedPlan(plan)}>{selectedPlan?.id === plan?.id ? "Selected" : "Select Plan"}</Button>
                            </Card.Footer>
                        </Card.Root>
                    )
                })
            }
        </Flex >
    )
}

export default PlanCard