import { useState } from "react";
import { Container, Box, Card, TextField, Text, Avatar, Flex, Button, Spinner } from "@radix-ui/themes";

import PasswordInput from "../Components/PasswordInput";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [inpudData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        fullName: ""
    });
    const [validEmail, setValidEmail] = useState(true);

    const isValidEmail = (email) => {
        if (!email) return false;
        if (email.includes(' ') || !email.includes('@')) return false;

        const emailparts = email.split('@');

        if (emailparts.length != 2 || emailparts[1].split('.')[1]?.length < 2) return false;

        if (!emailparts[0] || !emailparts[1] || !emailparts[1].includes('.')) return false;

        const dotIdx = emailparts[1].lastIndexOf('.');
        if (dotIdx === 0 || dotIdx === (emailparts[1].length - 1)) return false;

        return true;
    }


    const handleRegistry = (e) => {
        e.preventDefault();
        // TODO
        console.log("Registration attempt with:", inpudData);
    }

    return (
        <Container size="2" style={{ padding: '0 10px' }}>
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
                        mt='2'
                    >
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
                        Regisztráció
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
                        Hozz létre egy fiókot!
                    </Text>
                    <Text as="label" htmlFor="usernameInput" mx='1'>
                        Email
                    </Text>
                    <TextField.Root
                        type="email"
                        radius="full"
                        placeholder="jeffrey.stain@gmail.com"
                        size="3" name="emailInput"
                        id="emailInput"
                        mt="2"
                        mb="3"
                        color="blue"
                        value={inpudData.email}
                        required
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else {
                                setInputData({ ...inpudData, email: e.target.value })
                                setValidEmail(isValidEmail(e.target.value));
                            }
                        }}
                    />

                    {
                        !validEmail &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="blue"
                        >
                            Az email formátuma helytelen!
                        </Text>
                    }

                    <Text as="label" htmlFor="userNameI" mx='1'>
                        Felhasználónév
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="full"
                        placeholder="Felhasználónév"
                        size="3"
                        name="userNameI"
                        id="userNameI"
                        mt="2"
                        mb="3"
                        color="blue"
                        value={inpudData.username}
                        required
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, username: e.target.value })
                        }}
                    />

                    <Text as="label" htmlFor="fullNameI" mx='1'>
                        Teljes Név
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="full"
                        placeholder="John Doe"
                        size="3"
                        name="fullNameI"
                        id="fullNameI"
                        mt="2"
                        mb="3"
                        color="blue"
                        value={inpudData.fullName}
                        onChange={(e) => setInputData({ ...inpudData, fullName: e.target.value })}
                        required
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
                        Jelszó
                    </Text>
                    <PasswordInput
                        inputName="password"
                        value={inpudData.password}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, password: e.target.value })
                        }}
                    />

                    <Text
                        as="label"
                        htmlFor="passwordConfirm"
                        mx='1'
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Jelszó megerősítése
                    </Text>
                    <PasswordInput
                        inputName="passwordConfirm"
                        value={inpudData.passwordConfirm}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, passwordConfirm: e.target.value })
                        }}
                    />

                    {
                        inpudData.password.length < 6 &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="blue"
                        >
                            A jelszóban legalább 6 karakternek lennie kell!
                        </Text>
                    }

                    {
                        inpudData.password !== inpudData.passwordConfirm &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="blue"
                        >
                            A jelszavak nem egyeznek meg!
                        </Text>
                    }

                    {
                        validEmail && inpudData.email && inpudData.password.length >= 6 && inpudData.password === inpudData.passwordConfirm
                            ?
                            loading
                                ?
                                <Button
                                    style={{ width: '100%' }}
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
                                    Regisztráció
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
                                    onClick={(e) => handleRegistration(e)}
                                >
                                    Regisztráció
                                </Button>
                            :
                            <Button
                                style={{ width: '100%' }}
                                variant="outline"
                                mt="4"
                                mb="3"
                                size="3"
                                radius="full"
                                disabled
                                color="magenta"
                            >
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
                            color="grey"
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
                        Itt bejelentkezhet, ha van aktív fiókja:
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
                        Bejelenkezés
                    </Button>


                </Card>
            </Flex>
        </Container>
    )
}