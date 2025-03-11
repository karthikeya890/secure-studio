import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { convertToUTC, startDateEndDateHour, formatDateTime } from "../../utils/date";
import useServiceStore from "../../stores/services";


const { startTimeDefault, endTimeDefault } = startDateEndDateHour();

const formSchema = z.object({
    startTime: z
        .string({ required_error: "Start time is required" })
        .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date format" })
        .refine((value) => new Date(value).getMinutes() === 0, { message: "Start time must be in full hours (HH:00)" })
        .refine((value) => new Date(value) >= new Date(), { message: "Start time cannot be in the past" }),

    endTime: z.string()
});

const HourForm = () => {
    const { register, handleSubmit, setValue, watch, formState } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startTime: startTimeDefault,
            endTime: endTimeDefault,
        },
    });

    const { setScheduleCount, scheduleCount, selectedPlan, setDurationDates, setPaymentCard } = useServiceStore();
    const startTime = watch("startTime");

    const updateEndTime = () => {
        if (startTime) {
            const startDate = new Date(startTime);
            const newEndDate = new Date(startDate.getTime() + scheduleCount * 60 * 60 * 1000);
            setValue("endTime", formatDateTime(newEndDate));
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        const startTime = convertToUTC(data.startTime);
        const endTime = convertToUTC(data.endTime);
        setDurationDates({ startTime, endTime });
        setPaymentCard(true);
    }, () => setPaymentCard(false));


    useEffect(() => {
        if (startTime) {
            updateEndTime();
            onSubmit();
        }
    }, [startTime, scheduleCount]);

    const handleIncreaseHours = () => setScheduleCount(scheduleCount + 1);
    const handleDecreaseHours = () => setScheduleCount(Math.max(1, scheduleCount - 1));
    return (
        <form>
            <Flex gap={5} mt={5} flexGrow={1} alignItems="start">
                <Field flexGrow={1} w="50%" justifyContent="center" invalid={!!formState.errors.startTime}
                    errorText={formState.errors.startTime?.message} helperText="Ex: 05-03-2025 05:00 AM">
                    <Text fontWeight="500" fontSize="0.9em" color="blackAlpha.800">Start DateTime</Text>
                    <Input
                        step="3600"
                        outlineColor="primary"
                        _focus={{ borderColor: "primary" }}
                        type="datetime-local"
                        min={startTimeDefault}
                        {...register("startTime")}
                    />
                </Field>
                <Field flexGrow={1} w="50%" justifyContent="center">
                    <Text fontWeight="500" fontSize="0.9em" color="blackAlpha.800">End DateTime</Text>
                    <Input
                        step="3600"
                        outlineColor="primary"
                        _focus={{ borderColor: "primary" }}
                        type="datetime-local"
                        value={watch("endTime")}
                        disabled
                    />
                </Field>
            </Flex>
            {
                selectedPlan?.durationValueSelect === "USER_SELECTED" &&
                <Flex mt={4} gap={3} alignItems="center">
                    <Button h={10} w={10} borderRadius={"50%"} onClick={handleDecreaseHours} disabled={scheduleCount === 1}>-1</Button>
                    <Text>{scheduleCount} {scheduleCount === 1 ? "hour" : "hours"}</Text>
                    <Button h={10} w={10} borderRadius={"50%"} onClick={handleIncreaseHours}>+1</Button>
                </Flex>
            }
        </form>
    );
};

export default HourForm;
