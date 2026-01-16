import { Box, Flex, Card, Text, Button, ScrollArea } from "@radix-ui/themes";

export default function ChatComponent({ chat }) {
    return (
        <Flex direction="column" style={{ height: "100%", width: '100%' }}>
            <Box style={{ flex: 1, overflow: "hidden" }} m='5'>
                <Card style={{ height: "100%" }}>
                    <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>

                        {
                            chat.length === 0 &&
                            <Flex p="4"
                                justify='center'
                                direction='column'
                                style={{ height: '100%', textAlign: 'center' }}
                            >
                                Válasszon egy csevegést a bal oldali sávból, vagy kezdjen egy újat!
                            </Flex>
                        }

                    </ScrollArea>
                </Card>
            </Box>
        </Flex>
    )
}