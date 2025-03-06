import { Flex } from "@chakra-ui/react"

const Notes = () => {
    return (
        <Flex fontSize={"10"} fontWeight={"bolder"} color={"blackAlpha.500"}
            h={"100%"} bg={'white'} p={[2, 5]} borderRadius={25} boxShadow={"md"}
            justifyContent={"center"} alignItems={"center"}
        >
            Notes
        </Flex>
    )
}

export default Notes