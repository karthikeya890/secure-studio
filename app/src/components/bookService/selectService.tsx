import { Card, Box, Flex, Button } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { InfoTip } from "../ui/toggle-tip";
import useServiceStore from "../../stores/services";
import { useState } from "react";
import ForwordIcon from "../../assets/forward";
import BackwardIcon from "../../assets/backward";
const SelectService = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { selectedService, setSelectedService, selectedServiceCategory } = useServiceStore();


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (selectedServiceCategory?.services?.length - 2));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? (selectedServiceCategory?.services?.length - 2) - 1 : prevIndex - 1
        );
    };

    const services = selectedServiceCategory?.services?.map((service: any) => {
        return (
            <Card.Root onClick={() => {
                setSelectedService(service);
                (document as any).getElementById("end").scrollIntoView({ behavior: "smooth" });
            }} key={service.id} minW={{ base: 220 }} maxW={{ base: 220 }}
                boxShadow={"md"} borderRadius={10} border={"2px solid"}
                borderColor={selectedService?.id === service?.id ? "blackAlpha.800" : "transparent"}
                opacity={selectedService?.id === service?.id ? "1" : "0.7"}
            >
                <Card.Body p={3}>
                    <Flex direction={"column"} justifyContent={"center"} gap={3}>
                        <Avatar
                            src={service?.iconUrl || "https://picsum.photos/200/300"}
                            name={service?.name || "demo"}
                            size="md"
                            shape="full"
                        />
                        <Card.Title bg={selectedService?.id === service?.id ? "blackAlpha.800" : "blackAlpha.100"} borderRadius={5} px={2}
                            color={selectedService?.id === service?.id ? "white" : "gray"}
                            fontWeight={"500"} fontSize={"0.9em"} >{service?.name}</Card.Title>
                        <Box position={"absolute"} top={3} right={3} >
                            <InfoTip size={"lg"} content={service?.description} showArrow />
                        </Box>
                    </Flex>
                </Card.Body>
            </Card.Root>
        )
    })
    return (
        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}   >
            <Flex overflowX={"hidden"} justifyContent={"center"} alignItems={"center"}  >
                <Flex  py={4}
                    transition="transform 0.5s ease-in-out"
                    transform={`translateX(-${currentIndex * 240}px)`}
                    alignItems={"center"} w={700}
                    textAlign={"center"} gap={5}  >
                    {services}
                </Flex >
            </Flex>
            <Button opacity={selectedServiceCategory?.services?.length > 3 ? 1 : 0} variant={"plain"} position={"absolute"} left={0} onClick={prevSlide}>
                {BackwardIcon()}
            </Button>

            <Button opacity={selectedServiceCategory?.services?.length > 3 ? 1 : 0} variant={"plain"} position={"absolute"} right={0} onClick={nextSlide}>
                {ForwordIcon()}
            </Button>
        </Flex>


    );
}
export default SelectService