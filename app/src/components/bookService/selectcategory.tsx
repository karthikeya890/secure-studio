import { Card, Box, Flex, Button } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { InfoTip } from "../ui/toggle-tip";
import useServiceStore from "../../stores/services";
import { useState } from "react";
import ForwordIcon from "../../assets/forward";
import BackwardIcon from "../../assets/backward";

const SelectCategory = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { serviceCategories, setSelectedServiceCategory, selectedServiceCategory } = useServiceStore();


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (serviceCategories?.length - 2));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? (serviceCategories?.length - 2) - 1 : prevIndex - 1
        );
    };


    const Categories = serviceCategories.map((category: any) => {
        return (
            <Card.Root onClick={() => setSelectedServiceCategory(category)} position={"relative"} key={category.id} minW={{ base: 220 }} maxW={{ base: 220 }}
                boxShadow={"md"} borderRadius={10} border={"2px solid"}
                borderColor={selectedServiceCategory?.id === category?.id ? "blackAlpha.800" : "transparent"}
                opacity={selectedServiceCategory?.id === category?.id ? "1" : "0.7"}
            >
                <Card.Body p={3}>
                    <Flex direction={"column"} justifyContent={"center"} gap={3}>
                        <Avatar
                            src={category?.iconUrl || "https://picsum.photos/200/300"}
                            name={category?.name || "demo"}
                            size="md"
                            shape="full"
                        />
                        <Card.Title bg={selectedServiceCategory?.id === category?.id ? "blackAlpha.800" : "blackAlpha.100"} borderRadius={5} px={2}
                            color={selectedServiceCategory?.id === category?.id ? "white" : "gray"}
                            fontWeight={"500"} fontSize={"0.9em"} >{category?.name}</Card.Title>
                        <Box position={"absolute"} top={3} right={3} >
                            <InfoTip size={"lg"} content={category?.description} showArrow />
                        </Box>
                    </Flex>
                </Card.Body>
            </Card.Root >
        )
    })
    return (
        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}  >
            <Flex overflowX={"hidden"} justifyContent={"center"} alignItems={"center"}  >
                <Flex py={4}
                    transition="transform 0.5s ease-in-out"
                    transform={`translateX(-${currentIndex * 240}px)`}
                    alignItems={"center"} w={700}
                    textAlign={"center"} gap={5}  >
                    {Categories}
                </Flex >
            </Flex>
            <Button opacity={serviceCategories?.length > 3 ? 1 : 0} variant={"plain"} position={"absolute"} left={0} onClick={prevSlide}>
                {BackwardIcon()}
            </Button>

            <Button opacity={serviceCategories?.length > 3 ? 1 : 0} variant={"plain"} position={"absolute"} right={0} onClick={nextSlide}>
                {ForwordIcon()}
            </Button>
        </Flex>


    )
}

export default SelectCategory