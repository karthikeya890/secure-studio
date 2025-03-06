import useAuthStore from "../stores/auth"
import Login from "../components/auth/login"
import OTP from "../components/auth/otp"
import { Flex, Image } from "@chakra-ui/react"
import People from "../assets/login-people.png"
const Auth = () => {
  const { otpToken, isAuthenticated } = useAuthStore();
  return (
    <Flex gap={10} w={"100%"} h={"80vh"} justifyContent={"center"} flexDirection={["column", "column", "row"]} p={[5, 10, 20]} >
      <Flex w={{ sm: "100%", md: "40%" }} justifyContent={"center"} alignItems={"center"} >
        <Image src={People} w={[200, 200, 300, 500]} />
      </Flex>
      {!isAuthenticated && (otpToken ? <OTP /> : <Login />)}
    </Flex>
  )
}

export default Auth