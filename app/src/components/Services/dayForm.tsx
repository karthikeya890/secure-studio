import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useServiceCategory from "../../stores/serviceCategory";
import { convertToUTC } from "../../utils/date";

// Utility function to format date as "YYYY-MM-DDTHH:00"
const formatDate = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:00`;
};

// Get current time and round up to the next full hour
const now = new Date();
if (now.getMinutes() > 0) {
    now.setHours(now.getHours() + 1);
}
now.setMinutes(0, 0, 0);

const startTimeDefault = formatDate(now);

const formSchema = z.object({
    startTime: z
        .string({ required_error: "Start time is required" })
        .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date format" })
        .refine((value) => new Date(value).getMinutes() === 0, { message: "Start time must be in full hours (HH:00)" })
        .refine((value) => new Date(value) >= new Date(), { message: "Start time cannot be in the past" }),

    endTime: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const DayForm = () => {
    const { register, handleSubmit, setValue, watch, formState } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startTime: startTimeDefault,
            endTime: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)), // Default +1 day
        },
    });
    const { scheduleCount, setSubmitSchedule, setScheduleCount, nextStep, planDetails, setDurationDates } = useServiceCategory();
    const startTime = watch("startTime");

    const updateEndTime = () => {
        if (startTime) {
            const startDate = new Date(startTime);
            const newEndDate = new Date(startDate);
            newEndDate.setDate(startDate.getDate() + scheduleCount);
            setValue("endTime", formatDate(newEndDate));
        }
    };

    useEffect(() => {
        updateEndTime();
    }, [startTime, scheduleCount]);



    const onSubmit = handleSubmit(async (data) => {
        const startTime = convertToUTC(data.startTime);
        const endTime = convertToUTC(data.endTime);
        setDurationDates({ startTime, endTime })
        nextStep(3);
    });

    useEffect(() => {
        setSubmitSchedule(onSubmit);
    }, []);



    const handleIncreaseDays = () => setScheduleCount(scheduleCount + 1);
    const handleDecreaseDays = () => setScheduleCount(Math.max(1, scheduleCount - 1));

    return (
        <form onSubmit={onSubmit}>
            <Flex gap={5} mt={5} flexGrow={1} alignItems={"start"}>
                <Field flexGrow={1} w="50%" justifyContent="center" invalid={!!formState.errors.startTime}
                    errorText={formState.errors.startTime?.message} helperText="Ex: 05-03-2025 05:00 AM">
                    <Text fontWeight={"500"} fontSize={"0.9em"} color={"blackAlpha.800"}>Start DateTime</Text>
                    <Input
                        step="3600"
                        outlineColor={"primary"}
                        _focus={{ borderColor: "primary" }}
                        type="datetime-local"
                        min={startTimeDefault}
                        {...register("startTime")}
                    />
                </Field>

                <Field flexGrow={1} w="50%" justifyContent="center">
                    <Text fontWeight={"500"} fontSize={"0.9em"} color={"blackAlpha.800"}>End DateTime</Text>
                    <Input
                        step="3600"
                        outlineColor={"primary"}
                        _focus={{ borderColor: "primary" }}
                        type="datetime-local"
                        value={watch("endTime")}
                        disabled
                    />
                </Field>
            </Flex>
            {
                planDetails?.durationValueSelect === "USER_SELECTED" &&
                <Flex mt={4} gap={3} alignItems="center">
                    <Button h={10} w={10} borderRadius={"50%"} onClick={handleDecreaseDays} disabled={scheduleCount === 1}>-1</Button>
                    <Text>{scheduleCount} {scheduleCount === 1 ? "day" : "days"}</Text>
                    <Button h={10} w={10} borderRadius={"50%"} onClick={handleIncreaseDays}>+1</Button>
                </Flex>
            }
        </form>
    );
};

export default DayForm;
