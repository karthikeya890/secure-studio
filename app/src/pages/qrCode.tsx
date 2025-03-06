// import useAuthStore from "../stores/auth"
import { Flex } from "@chakra-ui/react";
import { QrCode } from "@chakra-ui/react";
const QrCodeCard = () => {

    // const { user } = useAuthStore();

    return (
        <Flex bg={"white"} borderRadius={25} flexGrow={1} h={"100%"} alignItems={"center"} justifyContent={"center"} >
            <QrCode.Root value={"https://www.secure.studio/"}  >
                <QrCode.Frame  >
                    <QrCode.Pattern />
                </QrCode.Frame>
            </QrCode.Root>
        </Flex>
    )
}

export default QrCodeCard

