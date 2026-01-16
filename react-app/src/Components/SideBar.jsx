import { Box, Card, Flex, Tabs, Text, ScrollArea, Heading, Avatar, TextField, Spinner } from "@radix-ui/themes";
import TabsComponent from "./TabsComponent";
import SearchNewFriend from "./SearchNewFriend";
import SearchCard from "./SearchCard";
import IncomingRequestsCard from "./IncomingRequestsCard";
import FriendCardComponent from "./FriendCardComponent";
import { useState } from "react";

export default function Sidebar({ options, activeTab, setActiveTab, incomingRequests, friends, handleSearchNewFriend, searchData, addFriend, loading, currentUserId, handleAccept }) {
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
                                <ScrollArea type="auto" scrollbars="vertical" radius='full' style={{ height: "100%", paddingRight: '15px' }}>
                                    {
                                        loading
                                            ?
                                            <Flex direction='column' justify='center' align='center' style={{ height: '90%' }}>
                                                <Spinner size='3' />
                                            </Flex>
                                            :
                                            <Flex direction='column'>
                                                {
                                                    (incomingRequests.length > 0) &&
                                                    <>
                                                        <Text as="p" style={{ opacity: '0.6', userSelect: 'none', cursor: 'default' }} mb='2'>
                                                            Beérkező kérelmek
                                                        </Text>

                                                        {
                                                            incomingRequests.map((request, idx) => (<IncomingRequestsCard key={idx} request={request} handleAccept={handleAccept} />))
                                                        }
                                                    </>
                                                }

                                                {
                                                    (friends.length > 0) &&
                                                    <>
                                                        <Text as="p" style={{ opacity: '0.6', userSelect: 'none', cursor: 'default' }} mb='2'>
                                                            Ismerősök
                                                        </Text>

                                                        {
                                                            friends.map((friend, idx) => (<FriendCardComponent key={idx} friend={friend} />))
                                                        }
                                                    </>
                                                }

                                            </Flex>
                                    }

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
                                                cardsData.map((user, idx) => <SearchCard key={idx} user={user} addFriend={addFriend} currentUserId={currentUserId} />)
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