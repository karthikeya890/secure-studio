import { Flex, Button, Stack, Heading } from "@chakra-ui/react"
import { Field } from "../../components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { toaster } from "../../components/ui/toaster"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PinInput } from "../ui/pin-input"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Spinner } from "@chakra-ui/react"
import useAuthStore from "../../stores/auth"

const formSchema = z.object({
    otp: z.array(z.string().min(1), { required_error: "OTP is required" })
        .length(6, { message: "OTP must be 6 digits long" }),
})

type FormValues = z.infer<typeof formSchema>

const OTP = () => {
    const { handleSubmit, control, formState, clearErrors, setError } = useForm<FormValues>({ resolver: zodResolver(formSchema) });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { verifyOTP, setOtpToken, afterLoginGoTo } = useAuthStore();

    const onSubmit = handleSubmit(async (data) => {
        let toastId: any = toaster.create({ description: "Checking OTP", type: "loading" })
        setLoading(true);
        clearErrors();
        try {
            const response: any = await verifyOTP({ otp: data.otp.join("") });
            toaster.update(toastId, { description: response.message || "OTP Verification Succesfully", type: "success" })
            setLoading(false);
            navigate(afterLoginGoTo)
            setOtpToken(null);
        } catch (error: any) {
            if (error.status === 400) {
                setError("otp", { message: error.data.message })
                toaster.update(toastId, { description: error.data.message || "OTP Verification Failed", type: "error" })
            };
            if (error.status === 500) toaster.update(toastId, { description: error.message || "OTP Verification Failed", type: "error" });
            setLoading(false); // Keep this here for immediate error handling
            if (error.data.message === "OTP has expired. Please request a new one.") setOtpToken(null);
        }
    });

    return (
        <Flex flexGrow={{ base: 0, md: 1 }}  >
            <form onSubmit={onSubmit} style={{ display: "flex" }}  >
                <Flex w={"100%"} justifyContent={"center"} alignItems={"center"} >
                    <Stack gap={5} maxW={{ base: "90%", sm: 400 }} flexGrow={1} px={[4, 6, 10]} py={[6, 8, 16]} boxShadow={"sm"} border={"1px solid"} borderColor={"gray.300"} borderRadius={20}>
                        <Heading fontSize={"2xl"} textAlign={"center"}>Enter OTP</Heading>
                        <Field w="100%" justifyContent="center" invalid={!!formState.errors.otp} errorText={formState.errors.otp?.message}>
                            <Controller control={control} name="otp"
                                render={({ field }) => (
                                    <PinInput w="100%" value={field.value} onValueChange={(e) => field.onChange(e.value)} />
                                )}
                            />
                        </Field>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : "Submit"}
                        </Button>
                    </Stack>
                </Flex>
            </form>
        </Flex>

    )
}

export default OTP