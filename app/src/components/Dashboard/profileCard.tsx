import { Flex, Text, Editable } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import useAuthStore from "../../stores/auth"
import Profile from "../../assets/demo-profile.png"
const ProfileCard = () => {
    const { user } = useAuthStore();

    return (
        <Flex bgColor={"blu"} fontSize={[14, 16, 20]} height={"100%"} bg={"white"} p={[2, 5]} borderRadius={25} boxShadow={"md"}
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
                <Editable.Root fontSize={"1em"} fontWeight={"bold"} color={"blackAlpha.800"} textAlign="start" defaultValue={user?.name?.toUpperCase() || "not-provided"}>
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>
                <Flex direction={"column"} h={"100%"} flexGrow={1} fontSize={"0.8em"} >
                    <Flex fontWeight={"bold"} color={"blackAlpha.900"} alignItems={"center"}>
                        <Text w={"80px"} color={"blackAlpha.800"}>Email :</Text>
                        <Editable.Root textAlign="start" defaultValue={user.email || "not-provided"}>
                            <Editable.Preview />
                            <Editable.Input />
                        </Editable.Root>

                    </Flex>
                    <Flex fontWeight={"bold"} color={"blackAlpha.900"} alignItems={"center"}>
                        <Text w={"80px"} color={"blackAlpha.800"}>Phone :</Text>
                        <Editable.Root textAlign="start" defaultValue={user.phone || "not-provided"}>
                            <Editable.Preview />
                            <Editable.Input />
                        </Editable.Root>

                    </Flex>
                    <Flex fontWeight={"bold"} color={"blackAlpha.900"} alignItems={"center"}>
                        <Text w={"80px"} color={"blackAlpha.800"}>Gender :</Text>
                        <Editable.Root textAlign="start" defaultValue={user.gender || "not-provided"}>
                            <Editable.Preview />
                            <Editable.Input />
                        </Editable.Root>
                    </Flex>
                </Flex>
            </Flex >
        </Flex >
    )
}

export default ProfileCard