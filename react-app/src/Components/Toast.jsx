import * as Toast from "@radix-ui/react-toast";
import { Card, Text, Button, Flex } from "@radix-ui/themes";

export default function ToastApp({ toastData, setToastData }) {

    return (
        <Toast.Provider swipeDirection="up" duration={3000}>
             <Toast.Root open={toastData.open} onOpenChange={() => setToastData({ ...toastData, open: false })} asChild className="toastStyle">
                <Card
                    style={{
                        position: "fixed",
                        top: 16,
                        width: "300px",
                        margin: "0 auto",
                        right: 0,
                        left: 0,
                        borderLeft: toastData.isError ? "4px solid var(--red-9)" : "4px solid var(--green-9)",
                    }}
                >
                    <Flex direction="column" gap="2">
                        <Text weight="bold" color={toastData.isError ? "red" : "green"}>{toastData.title}</Text>

                        {toastData.description && (
                            <Text size="2" color="gray">
                                {toastData.description}
                            </Text>
                        )}

                        <Flex justify="end" mt="2">
                            <Toast.Close asChild>
                                <Button size="1" variant="soft" color={toastData.isError ? "red" : "green"}>
                                    Ok
                                </Button>
                            </Toast.Close>
                        </Flex>
                    </Flex>
                </Card>
            </Toast.Root>

            <Toast.Viewport />
        </Toast.Provider>
    );
}