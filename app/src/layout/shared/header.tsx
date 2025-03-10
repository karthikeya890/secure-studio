import { Flex, Image, Button, Link, Box, Span } from "@chakra-ui/react"
import logo from "../../assets/logo-lg.png"
import useAuthStore from "../../stores/auth"
import { useLocation } from "react-router-dom"
import { MenuContent, MenuItem, MenuRoot, MenuTrigger, } from "../../components/ui/menu"
import MoreIcon from "../../assets/more"

const Header = () => {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}
            py={[2, 4]} px={[4, 12]} borderBottom={"1px solid"} borderColor={"gray.300"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Link href="/" outline={"none"} >
                    <Image src={logo} h={[10, 12]} />
                </Link>
            </Flex>
            <Flex display={{ base: "none", md: "flex" }} gap={4} alignItems={"center"} fontSize={"sm"} >
                {isAuthenticated && <Link fontWeight={"400"} href="/dashboard" outlineColor={"none"} _focus={{ outlineColor: "transparent" }}>Dashboard</Link>}
                {location.pathname === "/auth" && <Link fontWeight={"400"} href="/" outlineColor={"none"} _focus={{ outlineColor: "transparent" }}>Home</Link>}
                <Link fontWeight={"400"} href="#services" outlineColor={"none"} _focus={{ outlineColor: "transparent" }}>Services</Link>
                <Link fontWeight={"400"} href="#amenities" outlineColor={"none"} _focus={{ outlineColor: "transparent" }}>Amenities</Link>
                <Link fontWeight={"400"} href="#getinTouch" outlineColor={"none"} _focus={{ outlineColor: "transparent" }}>Support</Link>
                <Link fontWeight={"400"} href="#aboutUs" outlineColor={"none"} _focus={{ outlineColor: "transparent" }}>About Us</Link>
            </Flex>
            <Flex gap={{ base: 3, sm: 5 }} alignItems={"center"} >
                {!isAuthenticated && location.pathname !== "/auth" && (
                    <Link href="/auth">
                        <Button borderRadius={25}
                            border={0} px={{ base: 2, md: 4 }} py={{ base: 1, md: 2 }} h={"auto"}>
                            Sign In
                        </Button>
                    </Link>)}
                <Box display={{ md: "none" }} >
                    <MenuRoot>
                        <MenuTrigger display={"flex"} justifyContent={"center"} asChild>
                            <Span> {MoreIcon("25", "25")}</Span>
                        </MenuTrigger>
                        <MenuContent>
                            {isAuthenticated && <MenuItem value="Dashboard"><Link fontWeight={"400"} href="/dashboard" outlineColor={"none"} _focus={{ outlineColor: "transparent" }} >Dashboard</Link></MenuItem>}
                            {location.pathname === "/auth" && <MenuItem value="Home"><Link fontWeight={"400"} href="/" outlineColor={"none"} _focus={{ outlineColor: "transparent" }} >Home</Link></MenuItem>}
                            <MenuItem value="Services"><Link fontWeight={"400"} href="#services" outlineColor={"none"} _focus={{ outlineColor: "transparent" }} >Services</Link></MenuItem>
                            <MenuItem value="Amenities"><Link fontWeight={"400"} href="#amenities" outlineColor={"none"} _focus={{ outlineColor: "transparent" }} >Amenities</Link></MenuItem>
                            <MenuItem value="Support"><Link fontWeight={"400"} href="#getinTouch" outlineColor={"none"} _focus={{ outlineColor: "transparent" }} >Support</Link></MenuItem>
                            <MenuItem value="Support"><Link fontWeight={"400"} href="#aboutUs" outlineColor={"none"} _focus={{ outlineColor: "transparent" }} >About us</Link></MenuItem>
                        </MenuContent>
                    </MenuRoot>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Header