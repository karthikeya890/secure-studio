import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { convertToUTC, getFutureDateYear, startDateEndDateYear, formatDate } from "../../utils/date";
import useServiceStore from "../../stores/services";

const { startTimeDefault, endTimeDefault } = startDateEndDateYear();

const formSchema = z.object({
    startTime: z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), "Invalid date format")
        .refine((value) => new Date(value).getMinutes() === 0, "Start time must be in full hours (HH:00)")
        .refine((value) => new Date(value) >= new Date(), "Start time cannot be in the past")
        .refine((value) => new Date(value).getDate() <= 28, "Start date cannot be after the 28th"),
    endTime: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const YearForm = () => {
    const { setScheduleCount, scheduleCount, selectedPlan, setDurationDates, setPaymentCard } = useServiceStore();
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
            setValue("endTime", formatDate(getFutureDateYear(startDate, scheduleCount)));
        }
    }, [startTime, scheduleCount, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        const startTime = convertToUTC(data.startTime);
        const endTime = convertToUTC(data.endTime);
        setDurationDates({ startTime, endTime })
    }, () => setPaymentCard(false));


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
                selectedPlan?.durationValueSelect === "USER_SELECTED" &&
                <Flex mt={4} gap={2} alignItems={"center"}>
                    <Button h={10} w={10} borderRadius={"50%"} onClick={() => setScheduleCount(Math.max(1, scheduleCount - 1))}>
                        -1
                    </Button>
                    <Text>{scheduleCount} {scheduleCount === 1 ? "year" : "years"}</Text>
                    <Button h={10} w={10} borderRadius={"50%"} onClick={() => setScheduleCount(scheduleCount + 1)}>
                        +1
                    </Button>
                </Flex>
            }
        </form>
    );
};

export default YearForm;
