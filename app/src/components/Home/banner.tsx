import { Box, Flex, Button, Image, Text, Span } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CoWorking from "../../assets/co-working.png"
import LimitedOffer from "../../assets/limited-offer.png"
import offerTag from "../../assets/offer-tag.png"

const slides = [
    {
        content: (
            <Flex gap={{ base: 10, lg: 0 }} p={{ base: 4, sm: 6, lg: 10 }} flexGrow={1} direction={{ base: "column", md: "row" }}>
                <Flex gap={{ base: 5, md: 5, lg: 10 }} order={2} direction={"column"} justifyContent={"center"} alignItems={"start"} w={{ base: "100%", md: "50%" }} color={"secondary"} >
                    <Box>
                        <Text fontSize={{ base: 24, sm: 36, lg: 60 }} fontWeight={"bold"} >Welcome to Warangal's</Text>
                        <Text fontSize={{ base: 20, sm: 30, lg: 50 }} fontWeight={"bold"}  ><Span fontWeight={400} fontFamily={"Mogra"} color={"support"}>First</Span> Co-Working Space</Text>
                    </Box>
                    <Text color={"blackAlpha.800"} fontSize={{ base: 14, sm: 18 }} fontWeight={"bold"} >
                        Experience a dynamic and inspiring environment designed for professionals, freelancers, and entrepreneurs. Our co-working space fosters creativity, collaboration, and productivity, giving you the perfect setting to work without distractions.
                        Work smarter in a vibrant, community-driven workspace with
                        <Span fontFamily={"Mogra"} fontWeight={400} color={"support"}> top-notch Amenities.</Span>
                    </Text>
                    <Button order={3} border={0} bg={'secondary'}  >Explore Amenties</Button>

                </Flex>
                <Flex order={{ md: 2 }} w={{ base: "100%", md: "50%" }} alignItems={"center"} justifyContent={{ base: "center", md: "end" }}  >
                    <Image src={CoWorking} h={{ base: "100%", md: "50%" }} />
                </Flex>
            </Flex>
        ),
        bg: "white",
    },
    {
        content: (
            <Flex gap={10} flexGrow={1} direction={"column"} justify={"center"} alignItems={"center"} >
                <Flex>
                    <Image w={400} src={LimitedOffer} />
                </Flex>

                <Flex gap={{ base: 3, sm: 5, lg: 10 }} direction={"column"} justify={"center"} alignItems={"center"} >
                    <Text color={"support"} textAlign={"center"} fontSize={{ base: 24, sm: 36, lg: 70 }} fontWeight={"bold"} >
                        Exclusive Launch Offer!
                    </Text>
                    <Text color={"support"} textAlign={"center"} fontSize={{ base: 24, sm: 40, }} fontWeight={"bold"} >
                        <Span fontFamily={"Mogra"} color={"dark"} >Flat 50% OFF</Span> for the First Month!
                    </Text>
                    <Text color={"support"} textAlign={"center"} fontSize={{ base: 15, sm: 20, }} fontWeight={"bold"} >
                        Be the first to register and claim this amazing offer until <Span fontFamily={"Mogra"} color={"dark"} >31st March</Span>.
                    </Text>
                </Flex>
            </Flex>
        ),
        bg: "transparent",
    }
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Auto-slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    //     );
    // };

    return (
        <Flex id="banner" overflow="hidden" w="98vw" h={{ lg: "95vh" }} justifyContent="center" position="relative">

            {/* Carousel Container */}
            <Box
                w="100vw"
                h="100%" // You can adjust this height
                borderRadius="lg"
                boxShadow='2xl'
                transition="transform 0.5s ease"
                transform={`translateX(-${currentIndex * 100}vw)`}
                display="flex"
            >
                <Image position={"absolute"} src={offerTag} h={{ base: "16vw", sm: "11vw", lg: "8vw" }} right={10} rotate={"20"} />

                {slides.map((slide, index) => (
                    <Flex
                        key={index}
                        minW="100vw"
                        h="full"
                        justify="center"
                        align="center"
                        bg={slide.bg}
                        color="white"
                        p={10}
                        borderRadius="lg"
                        flexDir="column"
                    >
                        {slide.content} {/* Custom HTML content */}
                    </Flex>
                ))}
            </Box>
            {/* Left Button */}
            {/* <Button
                position="absolute"
                left="10px"
                top="50%"
                transform="translateY(-50%)"
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: "blackAlpha.800" }}
                onClick={prevSlide}
            >
                ◀
            </Button> */}

            {/* Right Button */}
            {/* <Button
                position="absolute"
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: "blackAlpha.800" }}
                onClick={nextSlide}
            >
                ▶
            </Button> */}
        </Flex>
    );
};

export default Banner;
