import { Flex, Text, Span, Button, Input, Stack, Textarea } from "@chakra-ui/react"
import LocationIcon from "../../assets/location";
import CallIcon from "../../assets/call";
import MailIcon from "../../assets/mail";
import { Field } from "../../components/ui/field";
import { useForm } from "react-hook-form";
import { toaster } from "../../components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@chakra-ui/react"
import { useState } from "react";



const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name is too long" }),
    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(10, { message: "Phone number is too long" })
        .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
    message: z.string().min(1, { message: "Message is required" }).max(500, { message: "Message is too long" })
});

type FormValues = z.infer<typeof formSchema>;


const GetInTouch = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<FormValues>({ resolver: zodResolver(formSchema) });
    const [loading, setLoading] = useState(false);


    const onSubmit = handleSubmit(async () => {
        let toastId: any = toaster.create({ description: "Sending Message", type: "loading" });
        clearErrors();
        setLoading(true);

        try {
            const response: any = {};
            toaster.update(toastId, { description: response.message || "Message Sent successfully", type: "success" });
            setLoading(false);
        } catch (error: any) {
            if (error.status === 400) setError("email", { message: error.data.message });
            if (error.status === 500) {
                toaster.update(toastId, { description: error.data.message || "Message Sent Failed", type: "error" });
            }
            setLoading(false);
        }
    });


    const businessDetails = () => {
        return (
            <Flex gap={5} flexGrow={1} flexDir={["column"]} >
                <Flex alignItems={"center"} gap={3} >
                    <Span>{LocationIcon("25", "25", "#0d6efd")}</Span>
                    <Text fontSize={"md"} > 3rd Floor, Jakotia Complex, Opp. Ratna Hotel, Pochamma Maidan, Vasavi Colony, Kothawada, Warangal, Telangana 506002</Text>
                </Flex>
                <Flex alignItems={"center"} gap={3} >
                    <Span>{CallIcon("25", "25", "#0d6efd")}</Span>
                    <Text fontSize={"md"}>+91 9494644848</Text>
                </Flex>
                <Flex alignItems={"center"} gap={3} >
                    <Span>{MailIcon("25", "25", "#0d6efd")}</Span>
                    <Text fontSize={"md"}>support@secure.studio</Text>
                </Flex>
            </Flex>
        )
    }


    const businessHours = () => {
        return (
            <Flex gap={5} flexDir={"column"} flexGrow={1} p={5} bg={"whiteAlpha.100"} borderRadius={10}>
                <Text color={"#0d6efd"} fontSize={"lg"} fontWeight={"bold"} >Business Hours</Text>
                <Flex gap={5} flexDir={"column"} flexGrow={1}>
                    <Flex flexGrow={1} justifyContent={"space-between"} >
                        <Text>Monday - Saturday</Text>
                        <Text>09:00 AM - 08:00 PM</Text>
                    </Flex>
                    <Flex flexGrow={1} justifyContent={"space-between"} >
                        <Text>Sunday</Text>
                        <Text>Closed</Text>
                    </Flex>
                </Flex>
            </Flex>
        )
    }



    return (
        <Flex id="getinTouch" color={"white"} bg={"blackAlpha.900"} p={[5, 10]} gap={10} flexGrow={1} flexDir={"column"} alignItems={"center"}  >
            <Text fontSize={30} fontWeight={"bold"} >Get in Touch</Text>
            <Flex w={["100%", "100%", "80%", "60%"]} gap={[5, 5, 5, 10]} flexDir={["column", "column", "row"]} alignItems={["center"]}  >
                <Flex w={["100%", "80%", "50%"]} minH={300}  >
                    <Flex flexGrow={{ base: 1, md: 1 }} bg={"whiteAlpha.100"} px={[3, 6]} py={10} borderRadius={10}  >
                        <form onSubmit={onSubmit} style={{ display: "flex", flexGrow: 1 }}>
                            <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
                                <Stack gap={5} flexGrow={1}  >
                                    <Field label="Name" invalid={!!errors.name} errorText={errors.name?.message}>
                                        <Input outlineColor={"primary"} _focus={{ borderColor: "primary" }}  {...register("name")} />
                                    </Field>
                                    <Field label="Phone" invalid={!!errors.phone} errorText={errors.phone?.message}>
                                        <Input outlineColor={"primary"} _focus={{ borderColor: "primary" }}  {...register("phone")} />
                                    </Field>
                                    <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
                                        <Input outlineColor={"primary"} _focus={{ borderColor: "primary" }} type="email" {...register("email")} />
                                    </Field>
                                    <Field label="Message" invalid={!!errors.message} errorText={errors.message?.message}>
                                        <Textarea outlineColor={"primary"} _focus={{ borderColor: "primary" }}  {...register("message")} />
                                    </Field>
                                    <Button bg={"#0d6efd"} type="submit" disabled={loading}>
                                        {loading ? <Spinner size="sm" /> : "Submit"}
                                    </Button>
                                </Stack>
                            </Flex>
                        </form>
                    </Flex>
                </Flex>
                <Flex fontWeight={"500"} gap={10} p={5} flexDir={"column"} w={["100%", "80%", "50%"]} minH={300} >
                    {businessDetails()}
                    {businessHours()}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default GetInTouch