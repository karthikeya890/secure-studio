import { Flex, Span, Text } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import useAuthStore from "../../stores/auth"
import Profile from "../../assets/demo-profile.png"
const ProfileCard = () => {
    const { user } = useAuthStore();

    return (
        <Flex fontSize={[14, 16, 20]} height={"100%"} bg={"white"} p={[2, 5]} borderRadius={25} boxShadow={"md"}
            justifyContent={"center"} alignItems={"center"}
            gap={10}
        >

            <Flex justifyContent={"center"} alignItems={"center"}>
                <Avatar.Root w={"7vw"} h={"7vw"}  >
                    <Avatar.Image src={Profile} />
                    <Avatar.Fallback />
                </Avatar.Root>
            </Flex>
            <Flex gap={3} direction={"column"} flexGrow={1}  >
                <Text fontSize={"1em"} fontWeight={"bold"} color={"blackAlpha.900"} >{user?.name?.toUpperCase()}</Text>

                <Flex gap={2} direction={"column"} h={"100%"} flexGrow={1} fontSize={"0.8em"} >
                    <Flex gap={2} fontWeight={"bold"} color={"blackAlpha.900"}>
                        <Span color={"blackAlpha.800"}>Email :</Span>
                        <Text  >
                            {user.email}
                        </Text>
                    </Flex>
                    <Flex gap={2} fontWeight={"bold"} color={"blackAlpha.900"}>
                        <Span color={"blackAlpha.800"}>Phone :</Span>
                        <Text  >
                            {user.phone || "not-provided"}
                        </Text>
                    </Flex>
                    <Flex gap={2} fontWeight={"bold"} color={"blackAlpha.900"}>
                        <Span color={"blackAlpha.800"}>Gender :</Span>
                        <Text  >
                            {user.gender || "not-provided"}
                        </Text>
                    </Flex>
                </Flex>
            </Flex >
        </Flex >
    )
}

export default ProfileCard