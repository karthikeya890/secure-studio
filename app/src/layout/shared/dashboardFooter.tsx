import { Flex, Text, Link } from "@chakra-ui/react"
const DashboardFooter = () => {
    return (
        <Flex gap={10} justifyContent={"space-between"} flexWrap={"wrap"} color={"gray"} py={8} px={12} bg={"dark"}>
            <Text fontWeight={"400"} fontSize={"sm"} > 2025 SecureStudio. All rights reserved.</Text>
            <Flex gap={2}>
                <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Privacy policy</Link>
                <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Terms of service</Link>
                <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Contact support</Link>
            </Flex>
        </Flex>
    )
}

export default DashboardFooter