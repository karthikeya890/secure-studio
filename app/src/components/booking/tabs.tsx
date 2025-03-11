import { Flex, Tabs } from "@chakra-ui/react"
import useServiceStore from "../../stores/services"
import PlanCards from "./planCards";
// import DateSelection from "./dateSelectDialog";

const BookingTabs = () => {
    const { serviceCategories, selectedServiceCategory, setSelectedServiceCategory, duration, setDuration, durations } = useServiceStore();

    const onChangeTab = (e: any) => {
        setSelectedServiceCategory(serviceCategories.find(category => (category as any).id === e.value))
    }


    return (
        <Tabs.Root variant="enclosed" display={"flex"} gap={5}
            flexDir={"column"} alignItems={"center"} flexGrow={1}
            onValueChange={onChangeTab}
            fitted value={selectedServiceCategory?.id}>
            <Tabs.List w={"80%"}>
                {
                    serviceCategories?.map((category: any) => {
                        return <Tabs.Trigger key={category?.id} value={category?.id}>{category?.name}</Tabs.Trigger>
                    })
                }

            </Tabs.List>
            <Flex gap={10} alignItems={"center"}  >
                <Tabs.Root variant="enclosed" value={duration} onValueChange={(e: any) => setDuration(e.value)} >
                    <Tabs.List >
                        {
                            durations?.map((item: any) => {
                                return <Tabs.Trigger key={item} value={item}>{item}</Tabs.Trigger>
                            })
                        }
                    </Tabs.List>
                </Tabs.Root>
                {/* <DateSelection /> */}
            </Flex>
            {
                serviceCategories?.map((category: any) => {
                    return (
                        <Tabs.Content as={"div"} key={category?.id}
                            display={"flex"} justifyContent={"center"}
                            value={category?.id} >
                            <PlanCards />
                        </Tabs.Content>
                    )
                })
            }
        </Tabs.Root>
    )
}

export default BookingTabs