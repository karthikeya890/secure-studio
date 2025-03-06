import { Button, Flex, Text } from "@chakra-ui/react";
import useServiceCategory from "../../stores/serviceCategory"
import ScheduleIcon from "../../assets/schedule";
import HourForm from "./hourForm";
import MonthForm from "./monthForm";
import DayForm from "./dayForm";
import YearForm from "./yearForm";
const Schedule = () => {

    const { nextStep, planDetails, submitSchedule, setSelectedPlanId, scheduleCount } = useServiceCategory();

    return (
        <Flex fontSize={16} flexGrow={1} justifyContent={"center"} color={"blackAlpha.900"}>
            <Flex gap={10} direction={"column"} p={5} borderRadius={25} bg={"white"} w={"50%"} alignItems={"center"}>
                <Flex bg={"blackAlpha.200"} p={5} w={"100%"} justifyContent={"space-between"} borderRadius={10} >
                    <Flex w={"100%"} direction={"column"} gap={1} >
                        <Text fontWeight={"bold"}>Selected Plan</Text>
                        <Flex w={"100%"} justifyContent={"space-between"} alignItems={'center'} >
                            <Flex gap={3} alignItems={"center"} >
                                {ScheduleIcon("20", "20", "dark")}
                                <Text fontSize={"1em"} fontWeight={"600"}>
                                    {planDetails?.defaultValue + " " + planDetails?.duration[0]}{planDetails.defaultValue > 1 ? planDetails?.duration.slice(1).toLowerCase() + "s" : planDetails?.duration.slice(1).toLowerCase()} Plan
                                </Text>
                            </Flex>
                            <Text fontWeight={"600"}  >₹{planDetails?.price}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex gap={5} w={"100%"} flexGrow={1} direction={"column"} >
                    <Text fontWeight={"bold"} fontSize={"1.1em"} >Schedule Your Booking</Text>
                    {planDetails.duration === "HOUR" && HourForm()}
                    {planDetails.duration === "DAY" && DayForm()}
                    {planDetails.duration === "MONTH" && MonthForm()}
                    {planDetails.duration === "YEAR" && YearForm()}
                </Flex>
                <Flex bg={"blackAlpha.200"} p={5} w={"100%"} justifyContent={"space-between"} borderRadius={10} >
                    <Flex w={"100%"} justifyContent={"space-between"} alignItems={'center'} >
                        <Text fontSize={"1em"} fontWeight={"600"}>
                            Total Cost
                        </Text>
                        <Text fontWeight={"600"}  >₹{planDetails?.durationValueSelect === "USER_SELECTED" ? scheduleCount * planDetails?.price : planDetails?.price}</Text>
                    </Flex>
                </Flex>
                <Flex gap={5} w={"100%"} >
                    <Button flexGrow={1} variant={"outline"} onClick={() => {
                        nextStep(1)
                        setSelectedPlanId("")
                    }} >back</Button>
                    <Button flexGrow={1} type="submit" onClick={submitSchedule} >Continue</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Schedule