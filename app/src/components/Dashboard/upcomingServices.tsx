import { Flex, Text } from "@chakra-ui/react"

const UpcomingServices = () => {
    return (
        <Flex minH={"100%"} gap={2} direction={"column"} fontSize={25}
            fontWeight={"bolder"} color={"blackAlpha.700"}
            bg={'white'} p={[2, 5]} borderRadius={25} boxShadow={"md"}
            justifyContent={"center"} alignItems={"center"} h="100%"
        >
            <Text px={2} > Upcoming Services</Text>
        </Flex >
    )
}

export default UpcomingServices