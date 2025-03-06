import { Flex, Image } from "@chakra-ui/react"
import Construction from "../assets/construction.png"

const construction = () => {
    return (
        <Flex flexGrow={1} justifyContent={"center"} alignItems={"start"}>
            <Image width={"30%"} src={Construction} />
        </Flex>
    )
}

export default construction