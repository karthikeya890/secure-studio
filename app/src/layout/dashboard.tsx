import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashBoardHeader from "./shared/dashboardHeader";
// import DashboardFooter from "./shared/dashboardFooter";
import Sidebar from "./shared/sidebar";
const DashBoardLayout = () => {
    return (
        <Flex direction={"column"} height={"100vh"}>
            {/* Fixed Header */}
            <DashBoardHeader />

            {/* Main Content Area */}
            <Flex flexGrow={1} overflow={"hidden"} bg={"secondary.500"} >
                {/* Sidebar */}
                <Sidebar />

                {/* Scrollable Content */}
                <Flex px={[2, 5]} py={[3, 8]} bg={"white"} boxShadow={"2xl"} m={3} borderRadius={10} direction={"column"} flexGrow={1} overflowY={"auto"}>
                    <Outlet />
                </Flex>
            </Flex>

            {/* Fixed Footer */}
            {/* <DashboardFooter /> */}
        </Flex>
    );
};

export default DashBoardLayout;
