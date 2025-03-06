import { Flex, IconButton } from "@chakra-ui/react"
import Banner from "../components/Home/banner"
import Aboutus from "../components/Home/aboutUs"
import Amenities from "../components/Home/amenities"
import Companies from "../components/Home/companies"
import Services from "../components/Home/services"
import GetInTouch from "../components/Home/getInTouch"
import { useEffect, useState } from "react";
import upwardIcon from "../assets/upward"
const Home = () => {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Flex flexGrow={1} direction={"column"} >
            <Banner />
            <Aboutus />
            <Companies />
            <Amenities />
            <Services />
            <GetInTouch />
            {showButton && (
                <IconButton
                    aria-label="Go to top"
                    position="fixed"
                    bottom="30px"
                    right="30px"
                    size="lg"
                    bg={"white"}
                    onClick={scrollToTop}
                    boxShadow="lg"
                    borderRadius="full"
                >{upwardIcon()}</IconButton>
            )}
        </Flex>
    )
}

export default Home