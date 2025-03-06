import { Flex, Text, Card, Link } from "@chakra-ui/react"
import { Avatar } from "../ui/avatar";
import IgniteLabs from "../../assets/igniteLabs.png";
import Racchabanda from "../../assets/racchabanda.png";
import Codevel from "../../assets/codevel.png";
const Companies = () => {

    const companies = [
        {
            id: "1",
            name: "Ignite Labs",
            imageUrl: IgniteLabs,
            description: "Offering 100% job-assured IT real-time training, Ignite Labs prepares professionals for the dynamic IT industry.",
            webSiteLink: "www.ignitelabs.co.in"
        },
        {
            id: "2",
            name: "Racchabanda LLC, US",
            imageUrl: Racchabanda,
            description: "Specializing in software development and services, Racchabanda LLC delivers cutting-edge solutions for businesses worldwide.",
            webSiteLink: "www.racchabanda.com"
        },
        {
            id: "3",
            name: "CodeVel Technologies LLP, INDIA",
            imageUrl: Codevel,
            description: "Providing IT staffing solutions through Hire360, CodeVel Technologies connects businesses with top talent in the industry.",
            webSiteLink: "www.codevel.com"
        }
    ]

    return (
        <Flex id="Companies" px={{ base: 5, md: 10, lg: 20 }} py={{ base: 3, md: 7, lg: 10 }} gap={{ base: 3, md: 7, lg: 10 }} color={"white"} direction={"column"} alignItems={"center"} justifyContent={"center"} minH={100} flexGrow={1} bgGradient="to-t" gradientFrom="primary" gradientTo="secondary">
            <Text fontWeight={"bold"} fontSize={{ base: 25, md: 30, lg: 40 }} >Our Official Partners</Text>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={{ base: 13, md: 17 }} w={"80%"} >
                At Secure Studio, we collaborate with our esteemed partners to provide a comprehensive range of services,
                from IT training to staffing solutions and software development. Our partners are committed to
                delivering excellence and driving innovation in their respective fields.
            </Text>

            <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                {companies.map(company => {
                    return <Card.Root key={company.id} py={{ base: 2, md: 4 }} borderRadius={20} boxShadow={"xl"} flexGrow={1} flexWrap={"wrap"} >
                        <Card.Body gap={5}>
                            <Flex gap={5} alignItems={"center"}>
                                <Avatar bg={"transparent"} src={company.imageUrl} name={company.name}
                                    size={{ base: "lg", sm: "xl", md: "2xl" }}
                                    shape="square"
                                />
                                <Card.Title mt="2" fontSize={{ base: 15, lg: 17 }}>{company.name}</Card.Title>
                            </Flex>
                            <Card.Description fontSize={{ base: 12, lg: 17 }} >
                                {company.description || "Description"}
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer>
                            <Link>{company.webSiteLink}</Link>
                        </Card.Footer>
                    </Card.Root>
                })}

            </Flex>

        </Flex>
    )
}

export default Companies