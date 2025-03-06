import { Flex, Card, Button } from "@chakra-ui/react"
import useServiceCategory from "../../stores/serviceCategory"
import { useEffect } from "react";
import { toaster } from "../ui/toaster";
import { Avatar } from "../ui/avatar";
import Steps from "./services";
import WrongIcon from "../../assets/wrong";

const ServiceCard = () => {
    const { serviceCategories, getAllServiceCategories, selectedServiceCategoryId, setSelectedServiceCategoryId, reset } = useServiceCategory();

    useEffect(() => {
        getAllServiceCategories().catch(error => {
            toaster.create({ description: error.data.message || "Failed to fetch service Categories", type: "error" })
        }
        );
        return () => reset()
    }, []);

    const renderCategory = (category: any) => {
        return (
            <Card.Root key={category.id} width={[340]} boxShadow={"lg"} borderRadius={25}>
                <Card.Body gap={5}>
                    <Flex justifyContent={"space-between"}>
                        <Card.Title mt="2">{category.name}</Card.Title>
                        <Avatar
                            src="https://picsum.photos/200/300"
                            name="Nue Camp"
                            size="lg"
                            shape="rounded"
                        />
                    </Flex>
                    <Card.Description>
                        {category.description}
                    </Card.Description>
                </Card.Body>
                <Card.Footer>
                    <Button bg={selectedServiceCategoryId === category.id ? "red" : ""} onClick={() => {
                        setSelectedServiceCategoryId(category.id)
                    }} flexGrow={1}>{selectedServiceCategoryId === category.id ? "Close" : "Book"}</Button>
                </Card.Footer>
            </Card.Root>)
    }

    return (
        <Flex gap={10} direction={"column"} flexGrow={1} >
            {!selectedServiceCategoryId &&
                <Flex gap={10} justifyContent={"space-around"} >
                    {serviceCategories.map((category: any) => renderCategory(category))}
                </Flex>
            }
            {selectedServiceCategoryId &&
                <Flex flexGrow={1} flexDirection={"column"} borderRadius={10}>
                    <Button bg={"dark"} onClick={reset} alignSelf={"end"} borderRadius={"50%"} h={10} w={10} >{WrongIcon("40", "40", "#fff")}</Button>
                    <Steps />
                </Flex>
            }
        </Flex>
    )
}

export default ServiceCard