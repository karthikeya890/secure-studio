import { Flex, Text, Image, Span } from "@chakra-ui/react"
import People from "../../assets/login-people.png"

const AboutUs = () => {
    return (
        <Flex id="aboutUs" w={"100%"} p={{ base: 10, sm: 15, md: 20 }} gap={10} border={"2px solid"} borderColor={"gray.200"}
            direction={{ base: "column", md: "row" }} justifyContent={{ base: "center", md: "start" }}
            alignItems={{ base: "center" }}
        >
            <Image src={People} w={{ base: "90%", sm: "60%", md: "40%" }} />
            <Flex gap={{ base: 5, md: 20 }} textAlign={"center"} flexGrow={1} alignItems={"center"}
                direction={"column"} py={{ base: 4, sm: 7, md: 10 }} px={{ base: 2, sm: 10, md: 20 }}
            >
                <Text color={"dark"} fontSize={{ base: 20, md: 40, lg: 70 }} fontWeight={"bold"}  >
                    About Us
                </Text>
                <Text color={"dark"} fontSize={{ base: 13, md: 18 }} fontWeight={"bold"}  >
                    We are proud to introduce <Span color={"support"} >Warangal's first co-working space</Span>. Our mission is to provide a modern, collaborative environment where freelancers, entrepreneurs, and small businesses can thrive. Join us to work, connect, and grow in a space designed for success.
                </Text>
            </Flex>
        </Flex >
    )
}

export default AboutUs