import { Flex } from "@chakra-ui/react";
import HourForm from "./hourForm";
import MonthForm from "./monthForm";
import DayForm from "./dayForm";
import YearForm from "./yearForm";
import useServiceStore from "../../stores/services";

const Schedule = () => {
    const { selectedPlan } = useServiceStore();

    return (
        <Flex gap={5} w={"100%"} flexGrow={1} direction={"column"} >
            {selectedPlan?.duration === "HOUR" && <HourForm />}
            {selectedPlan?.duration === "DAY" && <DayForm />}
            {selectedPlan?.duration === "MONTH" && <MonthForm />}
            {selectedPlan?.duration === "YEAR" && <YearForm />}
        </Flex>
    )
}

export default Schedule