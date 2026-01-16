import { Box, Flex, Card, Text, Button, ScrollArea } from "@radix-ui/themes";
import Sidebar from "../Components/SideBar";

export default function ChatPage() {

  return (
    <Flex direction="row" height="100vh" width="100vw" justify="space-between" align="center">

      <Flex direction="column" style={{ height: "100%" }}>
        <Box style={{ flex: 1, overflow: "hidden" }} m='5'>
          <Sidebar />
        </Box>
      </Flex>

      <Flex direction="column" style={{ height: "100%", width: '100%' }}>
        <Box style={{ flex: 1, overflow: "hidden" }} m='5'>
          <Card style={{ height: "100%"}}>
            <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>


              <Flex p="4"
                justify='center'
                direction='column'
                style={{height: '100%', textAlign: 'center'}}
              >
                Válasszon egy csevegést a bal oldali sávból, vagy kezdj egy újat!
              </Flex>
            </ScrollArea>
          </Card>
        </Box>
      </Flex>
    </Flex>
  )
}