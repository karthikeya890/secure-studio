import { Card, Text, Flex, Button } from "@chakra-ui/react";
import useServiceStore from "../../stores/services";
import CurrencyIcon from "../../assets/currency";
import { useState } from "react";
import ForwordIcon from "../../assets/forward";
import BackwardIcon from "../../assets/backward";
const SelectPlan = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { selectedService, setSelectedPlan, selectedPlan } = useServiceStore();


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (selectedService?.subscriptions?.length - 2));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? (selectedService?.subscriptions?.length - 2) - 1 : prevIndex - 1
        );
    };

    const plans = selectedService?.subscriptions?.map((plan: any) => {
        return (
            <Card.Root onClick={() => setSelectedPlan(plan)} key={plan.id} minW={{ base: 220 }} maxW={{ base: 220 }}
                boxShadow={"lg"} borderRadius={10} border={"2px solid"}
                borderColor={selectedPlan?.id === plan?.id ? "blackAlpha.800" : "transparent"}
                opacity={selectedPlan?.id === plan?.id ? "1" : "0.7"}
            >
                <Card.Body p={3}>
                    <Flex direction={"column"} justifyContent={"center"} gap={1}>
                        <Flex alignItems={"center"}>
                            {CurrencyIcon("18", "18", '#000')}
                            <Text fontWeight={"bold"} fontSize={"1em"} >{plan?.price}/</Text>
                            {plan?.duration === "HOUR" && <Text fontWeight={"bold"} fontSize={"1em"}>hour</Text>}
                            {plan?.duration === "DAY" && <Text fontWeight={"bold"} fontSize={"1em"}>day</Text>}
                            {plan?.duration === "MONTH" && <Text fontWeight={"bold"} fontSize={"1em"}>month</Text>}
                            {plan?.duration === "YEAR" && <Text fontWeight={"bold"} fontSize={"1em"}>year</Text>}
                        </Flex>
                        {
                            plan?.defaultValue == 1 ? <Text color={"gray.500"} fontSize={"0.8em"} fontWeight={"500"} >
                                {plan?.defaultValue} {plan?.duration[0] + plan?.duration.toLowerCase().slice(1)} Plan
                            </Text> : <Text color={"gray.500"} fontSize={"0.8em"} fontWeight={"500"} >
                                {plan?.defaultValue} {plan?.duration[0] + plan?.duration.toLowerCase().slice(1)}s Plan
                            </Text>
                        }
                    </Flex>
                </Card.Body>
            </Card.Root >
        )
    })
    return <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}   >
        <Flex overflowX={"hidden"} justifyContent={"center"} alignItems={"center"}  >
            <Flex py={4}
                transition="transform 0.5s ease-in-out"
                transform={`translateX(-${currentIndex * 240}px)`}
                alignItems={"center"} w={700}
                textAlign={"center"} gap={5}  >
                {plans}
            </Flex >
        </Flex>
        <Button opacity={selectedService?.subscriptions?.length > 3 ? 1 : 0} variant={"plain"} position={"absolute"} left={0} onClick={prevSlide}>
            {BackwardIcon()}
        </Button>

        <Button opacity={selectedService?.subscriptions?.length > 3 ? 1 : 0} variant={"plain"} position={"absolute"} right={0} onClick={nextSlide}>
            {ForwordIcon()}
        </Button>
    </Flex>;
}
export default SelectPlan