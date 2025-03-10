
import { Flex, StepsRootProvider, useSteps } from "@chakra-ui/react"
import { StepsCompletedContent, StepsContent, StepsItem, StepsList } from "../ui/steps"
import { useEffect } from "react";
import useServiceStore from "../../stores/services";
import SelectServiceStep from "../bookService";

const BookServiceSteps = () => {
    const { setNextStep } = useServiceStore();
    const steps = useSteps({ defaultStep: 0, count: 4 });
    const { setStep } = steps;

    useEffect(() => { setNextStep(setStep) }, [])

    return (
        <Flex bg={"white"} p={5} borderRadius={25} w={"100%"} alignSelf={"center"} >
            <StepsRootProvider id="steps" value={steps} size={"sm"} minH={300} minW={"300"}>
                <StepsList colorPalette={"dark"} py={3} px={10} alignSelf={"center"}
                    w={{ base: 450 }} borderRadius={40}  >
                    <StepsItem index={0} title="Service" />
                    <StepsItem index={1} title="Payment" />
                </StepsList>
                <StepsContent  index={0} display={"flex"} flexGrow={1} justifyContent={"center"} >
                    <SelectServiceStep />
                </StepsContent>
                <StepsContent index={1} display={"flex"} flexGrow={1}   >
                </StepsContent>
                <StepsCompletedContent display={"flex"} flexGrow={1} >
                </StepsCompletedContent>
            </StepsRootProvider>
        </Flex>
    )
}

export default BookServiceSteps