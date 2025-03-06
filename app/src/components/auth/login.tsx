import { Flex, Button, Input, Stack, Heading } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { useForm } from "react-hook-form";
import useAuthStore from "../../stores/auth";
import { toaster } from "../../components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" })
});

type FormValues = z.infer<typeof formSchema>;

const Auth = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<FormValues>({ resolver: zodResolver(formSchema) });
    const { sendOTP, setOtpToken } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        let toastId: any = toaster.create({ description: "Sending OTP", type: "loading" });
        clearErrors();
        setLoading(true);

        try {
            const response: any = await sendOTP(data);
            const { otpToken } = response;
            toaster.update(toastId, { description: response.message || "OTP Sent successfully", type: "success" });
            setLoading(false);
            setOtpToken(otpToken);
        } catch (error: any) {
            if (error.status === 400) setError("email", { message: error.data.message });
            if (error.status === 500) {
                toaster.update(toastId, { description: error.data.message || "OTP Sent Failed", type: "error" });
            }
            setLoading(false);
        }
    });

    return (
        <Flex flexGrow={{ base: 0, md: 1 }}  >
            <form onSubmit={onSubmit} style={{ display: "flex" }}>
                <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <Stack gap={5} maxW={{ base: "90%", sm: 400 }} flexGrow={1} px={10} py={16} boxShadow={"sm"} border={"1px solid"} borderColor={"gray.300"} borderRadius={20}>
                        <Heading fontSize={"2xl"} textAlign={"center"}>Login / Register</Heading>
                        <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
                            <Input outlineColor={"primary"} _focus={{ borderColor: "primary" }} type="email" {...register("email")} placeholder="Enter your email" />
                        </Field>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : "Submit"}
                        </Button>
                    </Stack>
                </Flex>
            </form>
        </Flex>
    );
};

export default Auth;
