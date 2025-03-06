import { useEffect } from "react";
import { useHomeStore } from "../../stores/home";
import { Flex, Text, Image } from "@chakra-ui/react";

const Amenities = () => {

    const { fetchAmenities, amenities } = useHomeStore();

    useEffect(() => {
        (async function () {
            try {
                await fetchAmenities()
            } catch (error: any) {
                console.log(error.data)
            }
        })();

    }, [])

    return (
        <Flex id="amenities" direction={"column"} p={[5, 10]} bg={"gray.100"} gap={[5, 10]} flexGrow={1} justifyContent={"center"} alignItems={'center'} textAlign={"center"} >
            <Text fontSize={{ base: 20, md: 40 }} fontWeight={"bold"} color={"secondary"} >Our Amenities</Text>

            <Flex w={"90%"} gap={5} flexGrow={1} justifyContent={"center"} alignItems={'center'} flexWrap={"wrap"} >
                {amenities.map((amenity: any) => {
                    return <Flex bg={"white"} flexWrap={"wrap"} p={5} gap={5} direction={"column"} justifyContent={"center"}
                        alignItems={"center"} borderRadius={10} boxShadow={"md"} w={250} h={150} transition="all 0.3s ease-in-out"
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "2xl",
                        }} >
                        <Image src={amenity.iconUrl} w={16} h={16} />
                        <Text fontSize={15} fontWeight={"bold"} color={"dark"} >{amenity.name}</Text>
                    </Flex>
                })}
            </Flex>
        </Flex>
    )
}

export default Amenities