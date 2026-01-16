import * as Toast from "@radix-ui/react-toast";
import { Card, Text, Button, Flex } from "@radix-ui/themes";

export default function ToastApp({ open, onOpenChange, title, description }) {
    return (
        <Toast.Provider swipeDirection="up">
            <Toast.Root open={open} onOpenChange={() => onOpenChange(false)} asChild>
                <Card
                    style={{
                        position: "fixed",
                        top: 16,
                        width: "300px",
                        margin: "0 auto",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Flex direction="column" gap="2">
                        <Text weight="bold">{title}</Text>

                        {description && (
                            <Text size="2" color="gray">
                                {description}
                            </Text>
                        )}

                        <Flex justify="end" mt="2">
                            <Toast.Close asChild>
                                <Button size="1" variant="soft">
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