import { Flex, Text, Image, Box, Link } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import DashboardIcon from "../../assets/dashboard.svg"
import BookingIcon from "../../assets/booking.svg"
import SettingIcon from "../../assets/settings.svg"
import logo from "../../assets/logo-lg.png"
import ServicesIcon from "../../assets/services.svg"

const Sidebar = () => {
    const sections = [
        { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
        { name: "Services", path: "/services", icon: ServicesIcon },
        { name: "Bookings", path: "/bookings", icon: BookingIcon },
        { name: "Settings", path: "/settings", icon: SettingIcon },
    ]
    const renderSection = (data: any) => {
        return (
            <NavLink key={data.path} to={data.path} >
                {({ isActive }) => (
                    <Flex

                        alignItems={"center"} gap={3} position={"relative"} m={3} my={2} p={2} opacity={isActive ? 1 : 0.7} style={{ marginRight: isActive ? "0px" : "auto" }}
                        borderRadius={25} borderRightRadius={0} bgGradient={isActive ? "to-r" : ""} gradientFrom="blue.400" gradientTo="blue.200" >
                        {isActive && <>
                            <Box position={"absolute"} h={5} w={5} right={0} top={-5} zIndex={9999} bg={"blue.200"} >
                                <Box w={"100%"} h={"100%"} borderBottomRightRadius={25} bg={"white"}></Box>
                            </Box>
                            <Box position={"absolute"} h={5} w={5} bg={"blue.200"} right={0} bottom={-5} zIndex={9999}  >
                                <Box w={"100%"} h={"100%"} borderTopRightRadius={25} bg={"white"}></Box>
                            </Box>
                        </>}
                        <Box bg={"white"} p={2} borderRadius={"50%"}>
                            <Image h={5} src={data.icon} />
                        </Box>
                        <Text color={isActive ? "white" : "blackAlpha.800"}
                            transition="transform 0.5s ease" transform={isActive ? `translateX(5px)` : `translateX(0px)`}
                            fontSize={"md"} fontWeight="bold">
                            {data.name}
                        </Text>
                    </Flex>
                )}
            </NavLink>
        )
    }


    return (
        <Flex display={{ base: "none", md: "flex" }} borderRadius={10} gap={3} direction={"column"} w={{ base: "auto", lg: 270 }} flexShrink={0} mr={{ base: 2, lg: 5 }} >
            <Flex bg={"white"} borderRightRadius={25} direction={"column"} flexGrow={1}>
                <Flex px={[2, 5]} py={[5, 8]} >
                    <Link href="/" outline={"none"} >
                        <Image src={logo} h={50} />
                    </Link>
                </Flex>
                <Flex direction={"column"} flexGrow={1} justifyContent={"space-between"}  >

                    <Flex direction={"column"}>
                        {sections.map(item => {
                            return renderSection(item)
                        })}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Sidebar