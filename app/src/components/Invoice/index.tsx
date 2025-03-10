import { Flex } from "@chakra-ui/react"
import HeaderInvoice from "./header"
import { useRef } from "react"

const Invoice = () => {

    const invoiceRef = useRef<HTMLDivElement>(null)

    return (
        <Flex h={"100vh"} w={"100vw"} justifyContent={"center"} >
            <Flex ref={invoiceRef} flexDir={"column"} alignItems={"center"} border={"2px solid"} minWidth={"500px"}>
                <HeaderInvoice />
                {/* Invoice Body */}
                {/* Invoice Footer */}
            </Flex>
        </Flex>
    )
}

export default Invoice