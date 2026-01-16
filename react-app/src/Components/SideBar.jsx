import { Box, Card, Flex, Tabs, Text, ScrollArea, Heading, Avatar } from "@radix-ui/themes";
import TabsComponent from "./TabsComponent";
import { useState } from "react";

export default function Sidebar() {
    const [tabsOptions, setTabsOptions] = useState(
        {
            chats: 'Csevegések',
            friends: 'Ismerősök',
            search: 'Keresés'
        }
    );
    const [activeTab, setActiveTab] = useState("chats");

    return (
        <Card style={{ height: "100%", borderRadius: 0, minWidth: '300px' }}>
            <Flex direction="column" style={{ height: "100%" }} gap="3">
                <Flex
                    direction="row"
                    justify='center'
                    align='center'
                >
                    <Avatar
                        src="messageicon.png"
                        size='3'
                        title="Message Icon"
                        alt="Message Icon"
                    />
                    <Heading as="h1" ml='1'>Sublight</Heading>
                </Flex>

                <TabsComponent options={tabsOptions} activeTab={activeTab} setActiveTab={setActiveTab} />

                <Box style={{ flex: 1, overflow: "hidden" }}>
                    <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>
                        <Box pt="2">
                            Szia
                        </Box>
                    </ScrollArea>
                </Box>
            </Flex>
        </Card>
    );
}