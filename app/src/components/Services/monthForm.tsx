import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import useServiceCategory from "../../stores/serviceCategory";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { convertToUTC } from "../../utils/date";

// Function to format date-time as YYYY-MM-DDTHH:00
const formatDate = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:00`;
};

// Get the current date-time and round to the next full hour
const now = new Date();
if (now.getMinutes() > 0) {
    now.setHours(now.getHours() + 1); // Move to next hour
}
now.setMinutes(0, 0, 0); // Set minutes and seconds to 00

// Function to get a valid future date (keeping within 28-day rule)
const getFutureDate = (date: Date, monthsToAdd: number) => {
    const futureDate = new Date(date);
    futureDate.setMonth(futureDate.getMonth() + monthsToAdd);

    // Ensure the day does not exceed the 28th
    if (futureDate.getDate() > 28) {
        futureDate.setDate(28);
    }
    return futureDate;
};

// Default values
const startTimeDefault = formatDate(now);
const endTimeDefault = formatDate(getFutureDate(now, 1));

const formSchema = z.object({
    startTime: z
        .string({ required_error: "Start time is required" })
        .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date format" })
        .refine((value) => new Date(value).getMinutes() === 0, { message: "Start time must be in full hours (HH:00)" })
        .refine((value) => new Date(value) >= new Date(), { message: "Start time cannot be in the past" })
        .refine((value) => new Date(value).getDate() <= 28, { message: "Start date cannot be after the 28th" }),

    endTime: z.string({ required_error: "End time is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const MonthForm = () => {
    const { setScheduleCount, scheduleCount, setSubmitSchedule, nextStep, planDetails, setDurationDates } = useServiceCategory();
    const { register, handleSubmit, setValue, watch, formState } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { startTime: startTimeDefault, endTime: endTimeDefault },
    });

    const startTime = watch("startTime");

    useEffect(() => {
        if (startTime) {
            const startDate = new Date(startTime);
            if (startDate.getDate() > 28) {
                setValue("startTime", formatDate(new Date(startDate.setDate(28))));
            }
            setValue("endTime", formatDate(getFutureDate(startDate, scheduleCount)));
        }
    }, [startTime, scheduleCount, setValue]);



    const onSubmit = handleSubmit(async (data) => {
        const startTime = convertToUTC(data.startTime);
        const endTime = convertToUTC(data.endTime);
        setDurationDates({ startTime, endTime })
        nextStep(3);
    });

    useEffect(() => {
        setSubmitSchedule(onSubmit);
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <Flex gap={5} mt={5} flexGrow={1} alignItems={"start"}>
                <Field flexGrow={1} w="50%" justifyContent="center" invalid={!!formState.errors.startTime}
                    errorText={formState.errors.startTime?.message} helperText="Start date should be on or before 28th">
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
                <Field flexGrow={1} w="50%" justifyContent="center" invalid={!!formState.errors.endTime}
                    errorText={formState.errors.endTime?.message}>
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
                <Flex mt={4} gap={2} alignItems={"center"}>
                    <Button h={10} w={10} borderRadius={"50%"} onClick={() => setScheduleCount(Math.max(1, scheduleCount - 1))}>
                        -1
                    </Button>
                    <Text>{scheduleCount} {scheduleCount === 1 ? "month" : "months"}</Text>
                    <Button h={10} w={10} borderRadius={"50%"} onClick={() => setScheduleCount(scheduleCount + 1)}>
                        +1
                    </Button>
                </Flex>
            }
        </form>
    );
};

export default MonthForm;