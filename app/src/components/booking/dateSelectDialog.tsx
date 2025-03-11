import { Button,Dialog, Flex, Portal, useDialog } from "@chakra-ui/react"
import DayForm from "../bookService/dayForm"
import MonthForm from "../bookService/monthForm"
import YearForm from "../bookService/yearForm"
import HourForm from "../bookService/hourForm"
import useServiceStore from "../../stores/services"
const DateSelection = () => {
    const { duration } = useServiceStore();
    const dialog = useDialog()
    return (
        <Flex position={"relative"} opacity={0.5} pointerEvents={"none"} >
            <Dialog.RootProvider value={dialog}>
                <Dialog.Trigger asChild>
                    <Button variant="outline" size="sm">
                        {dialog.open ? "Selecting...." : "Select StartTime"}
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Body>
                                {duration === "HOUR" && <HourForm />}
                                {duration === "DAY" && <DayForm />}
                                {duration === "MONTH" && <MonthForm />}
                                {duration === "YEAR" && <YearForm />}
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button>Save</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.RootProvider>
        </Flex>
    )
}


export default DateSelection;