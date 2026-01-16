import { useState } from "react";
import { Container, Box, Card, TextField, Text, Avatar, Flex, Button, Spinner } from "@radix-ui/themes";

import PasswordInput from "../Components/PasswordInput";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [validData, setValidData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inpudData, setInputData] = useState({
        emailOrusername: "",
        password: ""
    });
    
    return (
        <Container size="2">
            <Flex
                align="center"
                justify="center"
                style={{
                    minHeight: '100vh',
                    userSelect: 'none',
                    cursor: 'default'
                }}
            >
                <Card
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                        padding: '20px',
                        userSelect: 'none',
                        cursor: 'default'
                    }}>

                    <Flex align="center"
                        justify="center"
                        mb="2"
                        mt='2'>
                        <Avatar
                            src="messageicon.png"
                            size='5'
                            title="Message Icon"
                            alt="Message Icon"
                        />
                    </Flex>


                    <Text
                        as="p"
                        size="6"
                        weight="bold"
                        align="center"
                        mb="1"
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Bejelenzkezés
                    </Text>
                    <Text
                        as='p'
                        size='3'
                        align='center'
                        mb='1'
                        style={{
                            opacity: '0.6',
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Jelentkezz be a fiókodba!
                    </Text>

                    <Text as="label" htmlFor="emailOrusername" mx='1'>
                    </Text>
                    <TextField.Root
                        radius="full"
                        placeholder="Email/Felhasználónév"
                        size="3" name="emailOrusername"
                        id="emailOrusername"
                        mt="2"
                        mb="1"
                        color="blue"
                        value={inpudData.emailOrusername}
                        onChange={(e) => setInputData({ ...inpudData, emailOrusername: e.target.value })}
                    />

                    <Text
                        as="label"
                        htmlFor="password"
                        mx='1'
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                    </Text>
                    <PasswordInput
                        inputName="password"
                        value={inpudData.password}
                        onChange={(e) => setInputData({ ...inpudData, password: e.target.value })}
                    />

                    {
                        !validData
                            ?
                            loading
                                ?
                                <Button
                                    variant="outline"
                                    mt="4"
                                    mb="3"
                                    size="3"
                                    radius="full"
                                    className="loginButton"
                                    disabled
                                    color="magenta"
                                >
                                    <Spinner loading />
                                    Bejelentkezés
                                </Button>
                                :
                                <Button
                                    variant="outline"
                                    mt="4"
                                    mb="3"
                                    size="3"
                                    radius="full"
                                    className="loginButton"
                                    style={{
                                        userSelect: 'none',
                                        cursor: 'pointer'
                                    }}
                                    color="magenta"
                                >
                                    Bejelentkezés
                                </Button>
                            :
                            <Button
                                variant="outline"
                                mt="4"
                                mb="3"
                                size="3"
                                radius="full"
                                className="loginButton"
                                disabled
                                color="magenta">
                                Bejelentkezés
                            </Button>
                    }

                    <Box my="5" style={{ position: "relative", textAlign: "center", opacity: 0.5, userSelect: 'none', cursor: 'default' }} color="magenta">
                        <Box
                            style={{
                                height: 1,
                                backgroundColor: "#0f00dd",
                            }}
                        />
                        <Text
                            size="2"
                            color="gray"
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                background: "white",
                                padding: "0 8px",
                                color: "#0f00dd"
                            }}
                        >
                        </Text>
                    </Box>

                    <Text
                        as="p"
                        size="4"
                        align="center"
                    >
                        Itt regisztrálhat, ha nincs aktív fiókja:
                    </Text>


                    <Button
                        variant="outline"
                        mt="5"
                        mb="3"
                        size="3"
                        radius="full"
                        className="loginButton"
                        color="magenta"
                        style={{
                            userSelect: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Regisztráció
                    </Button>


                </Card>
            </Flex>
        </Container>
    )
}