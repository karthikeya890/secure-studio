import { Grid, GridItem } from "@chakra-ui/react"
import ProfileCard from "../components/Dashboard/profileCard"
import UpcomingServices from "../components/Dashboard/upcomingServices"
// import RecentBookings from "../components/Dashboard/recentBookings"
import Notes from "../components/Dashboard/notes"
import ExpireSoonServices from "../components/Dashboard/ExpireSoon"
import QrCode from "./qrCode"

const Dashboard = () => {
    return (
        <Grid flexGrow={1}
            templateColumns={{ base: "repeat(5, 1fr)" }}
            templateRows="repeat(2, 1fr)"
            gap={5}
        >
            <GridItem rowSpan={2} colSpan={{ base: 5, lg: 3 }} >
                <Grid h={"100%"}
                    templateColumns="repeat(3,1fr)"
                    templateRows="repeat(8, 1fr)"
                    gap={5}
                >
                    <GridItem h={"100%"} colSpan={{ base: 3, sm: 1, md: 1 }} rowSpan={2}>
                        <QrCode />
                    </GridItem>
                    <GridItem h={"100%"} colSpan={{ base: 3, sm: 2, md: 2 }} rowSpan={2}>
                        <ProfileCard />
                    </GridItem>
                    <GridItem h={"100%"} colSpan={3} rowSpan={6}>
                        <UpcomingServices />
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem h={"100%"} rowSpan={1} colSpan={{ base: 5, lg: 2 }} >
                <ExpireSoonServices />
            </GridItem>
            <GridItem h={"100%"} rowSpan={1} colSpan={{ base: 5, lg: 2 }} >
                <Notes />
            </GridItem>
        </Grid>
    )
}


export default Dashboard