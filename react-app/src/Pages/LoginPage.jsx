import { useState} from "react";
import { Container, Box, Card, TextField, Text, Avatar, Flex, Button, Spinner } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../Components/PasswordInput";

export default function LoginPage({ loading, setLoading, toastData, setToastData }) {
    const [inpudData, setInputData] = useState({
        emailOrusername: "",
        password: ""
    });

    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...inpudData })
        })
            .then(async (resJSON) => {
                const res = await resJSON.json();
                if (resJSON.status === 200) {
                    setToastData({ open: true, title: 'Sikeres bejelentkezés', description: 'Bejelentkeztél sikeresen fiókodba.', isError: false });
                    localStorage.setItem('userData', JSON.stringify({ ...res.user, isLoggedIn: true }));
                } else if (resJSON.status === 401) {
                    setToastData({ open: true, title: 'Hibás adatok', description: 'Helytelen adatok.', isError: true });
                } else {
                    setToastData({ open: true, title: 'Hiba történt', description: 'Hiba történt a bejelentkezés során. Később próbáld újra.', isError: true });
                }
            })
            .catch(console.warn)
            .finally(() => {
                setLoading(false);
            });
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
                        Bejelentkezés
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

                    <TextField.Root
                        radius="full"
                        placeholder="Email/Felhasználónév"
                        size="3"
                        name="emailOrusername"
                        id="emailOrusername"
                        mt="2"
                        mb="1"
                        color="blue"
                        value={inpudData.emailOrusername}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, emailOrusername: e.target.value })
                        }}
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
                    </Text>
                    <PasswordInput
                        inputName="password"
                        value={inpudData.password}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, password: e.target.value })
                        }}
                    />

                    {
                        inpudData.emailOrusername.length > 0 && inpudData.password.length >= 6
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
                                    onClick={(e) => handleLogin(e)}
                                >
                                    Bejelentkezés
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
                        Itt regisztrálhatsz, ha nincs aktív fiókod:
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
                        onClick={() => {
                            navigate('/register');
                        }}
                    >
                        Regisztráció
                    </Button>


                </Card>
            </Flex>
        </Container>
    )
}