import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "./shared/header";
import Footer from "./shared/footer";

const HomeLayout = () => {
  return (
    <Flex direction={"column"} height={"100vh"} >
      <Header />
      <Flex flexGrow={1} >
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
};

export default HomeLayout;
