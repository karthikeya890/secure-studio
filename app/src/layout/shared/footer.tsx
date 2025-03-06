import { Flex, Text, Link, Image, Button } from "@chakra-ui/react"
import LinkdenIcon from "../../assets/linkden.png"
// import XIcon from "../../assets/x.png"
import InstagramIcon from "../../assets/instagram.png"
import FacebookIcon from "../../assets/facebook.png"
const Footer = () => {
    return (
        <Flex gap={10} flexWrap={"wrap"} color={"gray"} py={8} px={12} bg={"dark"}>
            <Flex direction={"column"} gap={3} w={300}>
                <Text fontWeight={"500"} fontSize={"md"} color={"light"} >About us</Text>
                <Text fontWeight={"400"} fontSize={"sm"} >Professional workspace solutions for bisinesses of all sizes.</Text>
            </Flex>
            <Flex direction={"column"} gap={3} w={300} >
                <Text fontWeight={"500"} fontSize={"md"} color={"light"} >Quick Links</Text>
                <Flex direction={"column"} gap={1}>
                    <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Services</Link>
                    <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Pricing</Link>
                    <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Contact</Link>
                </Flex>
            </Flex>
            <Flex direction={"column"} gap={3} w={300} >
                <Text fontWeight={"500"} fontSize={"md"} color={"light"} >Support</Text>
                <Flex direction={"column"} gap={1}>
                    <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Help Center</Link>
                    <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">FAQs</Link>
                    <Link color={"gray"} fontWeight={"400"} fontSize={"sm"} href="/">Terms of Services</Link>
                </Flex>
            </Flex>
            <Flex direction={"column"} gap={3} w={300} >
                <Text fontWeight={"500"} fontSize={"md"} color={"light"} >Connect</Text>
                <Flex gap={3} alignItems={"center"}>
                    <Link href="https://www.instagram.com/securestudioofficial/">
                        <Button p={0} variant={"plain"} ><Image src={InstagramIcon} h={9} /></Button>
                    </Link>
                    <Link href="https://www.facebook.com/people/SStudio/61572187624570/">
                        <Button p={0} variant={"plain"}><Image src={FacebookIcon} h={9} /></Button>
                    </Link>
                    {/* <Link href="/">
                        <Button p={0} variant={"plain"}><Image src={XIcon} h={10} /></Button>
                    </Link> */}
                    <Link href="https://www.linkedin.com/showcase/securestudio1/">
                        <Button p={0} variant={"plain"}><Image src={LinkdenIcon} h={9} /></Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Footer