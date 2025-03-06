import { Flex, Image, Link, Button } from "@chakra-ui/react"
import logo from "../../assets/logo-lg.png"
import useAuthStore from "../../stores/auth"

const DashBoardHeader = () => {
    const { logout } = useAuthStore()
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} py={4} px={12} borderBottom={"1px solid"} borderColor={"gray.300"}>
            <Flex>
                <Link href="/" outline={"none"} >
                    <Image src={logo} h={50} />
                </Link>
            </Flex>
            <Flex gap={4} alignItems={"center"} >
                <Link fontWeight={"400"} fontSize={"sm"} href="/">Home</Link>
            </Flex>
            <Flex gap={4} alignItems={"center"} >
                <Button  bg={"red.500"} onClick={logout} >Logout</Button>
            </Flex>
        </Flex>
    )
}

export default DashBoardHeader