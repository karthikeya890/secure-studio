import { Flex } from "@chakra-ui/react"
import ServiceCategories from "../components/Services/serviceCategory"

const DashBoard = () => {

    return (
        <Flex p={5} flexGrow={1} >
            <ServiceCategories />
        </Flex>
    )
}

export default DashBoard