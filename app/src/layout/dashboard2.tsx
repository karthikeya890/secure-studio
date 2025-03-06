import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashBoardHeader from "./shared/dashboardHeader2";
// import DashboardFooter from "./shared/dashboardFooter";
import Sidebar from "./shared/sidebar2";
const DashBoardLayout = () => {
    return (
        <Flex direction={"column"} height={"100vh"}>
            {/* Main Content Area */}
            <Flex flexGrow={1} overflow={"hidden"} bg={"blue.200"} >
                {/* Sidebar */}
                <Sidebar />

                <Flex direction={"column"} flexGrow={1} borderRadius={25} >
                    {/* Fixed Header */}
                    <Box  ><DashBoardHeader /></Box>
                    {/* Scrollable Content */}
                    <Flex  m={3}   direction={"column"} flexGrow={1} overflowY={"auto"}>
                        <Outlet />
                    </Flex>
                </Flex>
            </Flex>

            {/* Fixed Footer */}
            {/* <DashboardFooter /> */}
        </Flex>
    );
};

export default DashBoardLayout;
