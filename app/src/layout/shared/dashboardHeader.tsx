import { Flex, Link, Button, Text } from "@chakra-ui/react"
import useAuthStore from "../../stores/auth"
import HomeIcon from "../../assets/home"

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
};


const DashBoardHeader = () => {
    const { logout, user } = useAuthStore();
    const greeting = getGreeting();
    return (
        <Flex h={20} my={3}>
            <Flex boxShadow={"2xl"} bg={'white'} w={"100%"} px={5} mx={3} borderRadius={25} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"xl"} fontWeight={"bold"}>{greeting}, {user?.name || user.email.split("@")[0] || "User"}!</Text>
                <Flex gap={4} alignItems={"center"}  >
                    <Link href="/" outlineColor={"none"} _focus={{ outlineColor: "transparent" }} >
                        <Flex bg={"blue.400"} p={2.5} borderRadius={"50%"} fontWeight={"bold"} fontSize={"md"} gap={4} alignItems={"end"} >
                            {HomeIcon("20", "20", 'white')}
                        </Flex>
                    </Link>
                    <Button bg={"red.600"} borderRadius={25} variant={"solid"} onClick={logout} >Logout</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DashBoardHeader