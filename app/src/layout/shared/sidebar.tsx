import { Flex, Text, Image } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { Avatar } from "@chakra-ui/react"
import DashboardIcon from "../../assets/dashboard.svg"
import BookingIcon from "../../assets/booking.svg"
import InvoiceIcon from "../../assets/invoice.svg"
import SettingIcon from "../../assets/settings.svg"
import ServicesIcon from "../../assets/services.svg"
import useAuthStore from "../../stores/auth"

const Sidebar = () => {

    const { user } = useAuthStore()

    const sections = [
        { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
        { name: "Services", path: "/services", icon: ServicesIcon },
        { name: "Bookings", path: "/bookings", icon: BookingIcon },
        { name: "Invoices", path: "/invoices", icon: InvoiceIcon },
        { name: "Settings", path: "/settings", icon: SettingIcon },
    ]


    const renderSection = (data: any) => {
        return (
            <NavLink key={data.path} to={data.path} >
                {({ isActive }) => (
                    <Flex opacity={isActive ? 1 : 0.8} gap={2} p={2} borderRadius={5} bg={isActive ? "gray.200" : ""} >
                        <Image h={6} src={data.icon} />
                        <Text fontSize={"md"} fontWeight="bold">
                            {data.name}
                        </Text>
                    </Flex>
                )}
            </NavLink>
        )
    }


    return (
        <Flex  borderRadius={10} gap={3} direction={"column"} w={{ base: 270 }} flexShrink={0} m={{ base: 2, lg: 3 }} style={{ marginRight: 0 }}>
            <Flex bg={"white"} gap={8} px={[2, 5]} py={[5]} direction={"column"} boxShadow={"xl"} borderRadius={10} flexGrow={1} overflow={"auto"} >
                <Flex gap={3} borderRadius={5} alignItems={"center"}  >
                    <Avatar.Root size={"xl"} >
                        <Avatar.Fallback name={user.email} />
                        <Avatar.Image src={user.profileUrl} />
                    </Avatar.Root>
                    <Flex direction={"column"} >
                        <Text fontWeight={"bold"} fontSize={"sm"} >{user?.name || user.email.split("@")[0]}</Text>
                        <Text fontWeight={"500"} color={"gray.700"} fontSize={"sm"}>{user.email}</Text>
                    </Flex>
                </Flex>
                <Flex direction={"column"} gap={2}>
                    {sections.map(item => {
                        return renderSection(item)
                    })}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Sidebar