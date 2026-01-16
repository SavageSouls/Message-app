import { Box, Card, Flex, Tabs, Text, ScrollArea, Heading, Avatar, TextField, Spinner } from "@radix-ui/themes";
import TabsComponent from "./TabsComponent";
import SearchNewFriend from "./SearchNewFriend";
import SearchCard from "./SearchCard";
import { useState } from "react";

export default function SideBar({ options, activeTab, setActiveTab, handleSearchNewFriend, cardsData, addFriend, loading, currentUserId  }) {

    return (
        <Flex direction="column" style={{ height: "100%" }}>
            <Box style={{ flex: 1, overflow: "hidden" }} m='5'>
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
                            <Heading as="h1" ml='1'>Messaj</Heading>
                        </Flex>

                        <TabsComponent options={options} activeTab={activeTab} setActiveTab={setActiveTab} />

                        {
                            activeTab === 'chats' &&
                            <Box style={{ flex: 1, overflow: "hidden" }}>
                                <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>
                                    <Box pt="2">
                                        Csevegések
                                    </Box>
                                </ScrollArea>
                            </Box>
                        }

                        {
                            activeTab === 'friends' &&
                            <Box style={{ flex: 1, overflow: "hidden" }}>
                                <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>
                                    <Box pt="2">
                                        Ismerősök
                                    </Box>
                                </ScrollArea>
                            </Box>
                        }

                         {
                             activeTab === 'search' &&
                            <Box style={{ flex: 1, overflow: "hidden" }}>
                                <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%", userSelect: 'none', cursor: 'default' }}>
                                    <Box pt="2" style={{ userSelect: 'none', cursor: 'default' }} mb='2'>
                                       <SearchNewFriend handleSearchNewFriend={handleSearchNewFriend} />
                                    </Box>

                                    {
                                        loading &&
                                        <Flex direction='column' justify='center' align='center' style={{ height: '90%' }}>
                                            <Spinner size='3' />
                                        </Flex>
                                    }

                                    {
                                        cardsData.length > 0
                                        &&
                                        <Flex direction='column'>
                                            {
                                                 cardsData.map( (user, idx) => <SearchCard key={idx} user={user} addFriend={addFriend} currentUserId={currentUserId} /> )
                                            }
                                        </Flex>
                                    }
                                </ScrollArea>
                            </Box>
                        }

                    </Flex>
                </Card>
            </Box>
        </Flex>
    );
}