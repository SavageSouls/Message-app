import { useState } from "react";
import { Container, Box, Card, TextField, IconButton, Text, Avatar, Flex, Separator, Button, Spinner } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../Components/PasswordInput";

export default function RegisterPage( { loading, setLoading, setToastData, toastData } ) {
    let navigate = useNavigate();
    const [inpudData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        type: "user"
    });
    const [validEmail, setValidEmail] = useState(true);
    const [existingEmail, setExistingEmail] = useState(false);
    const [existingUsername, setExistingUsername] = useState(false);

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

    const handleRegistration = (e) => {
        e.preventDefault();
        setLoading(true);

        setExistingEmail(false);
        setExistingUsername(false);

        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...inpudData})
        })
            .then( async (resJSON) => {

                const res = await resJSON.json();
                
                if (resJSON.status === 201) {
                    setToastData( { ...toastData, open: true, title: 'Sikeres regisztráció!', description: 'Most már bejelentkezhet a fiókjába.', isError: false } );
                    navigate('/login');
                } else if (resJSON.status === 409) {
                    
                    if (res.error.includes('email and username')) {
                        setExistingEmail(true);
                        setExistingUsername(true);
                    } else if (res.error.includes('username')) {
                        setExistingUsername(true);
                    } else if (res.error.includes('email')) {
                        setExistingEmail(true);
                    }
                } else {
                    setToastData( { ...toastData, open: true, title: 'Hiba történt!', description: 'Hiba történt a regisztráció során, kérjük próbálja meg újra.', isError: true } );
                }

            } )
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
                        maxWidth: '400px',
                        width: '100%',
                        padding: '20px',
                        userSelect: 'none',
                        cursor: 'default',
                        margin: '10px'
                    }}>

                    <Flex align="center"
                        justify="center"
                        mb="2"
                        mt='2'>
                        <Avatar
                            src="icon.png"
                            size='5'
                            title="Mesaj icon"
                            alt="Mesaj icon"
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
                        mb='4'
                        style={{
                            opacity: '0.6',
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Hozzon létre egy fiókot!
                    </Text>

                    <Text as="label" htmlFor="emailInput" mx='1'>
                        Email
                    </Text>
                    <TextField.Root
                        type="email"
                        radius="full"
                        placeholder="minta.janos@gmail.com"
                        size="3" name="emailInput"
                        id="emailInput"
                        mt="2"
                        mb="3"
                        color="tomato"
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
                            color="tomato"
                        >
                            Az email formátum nem érvényes!
                        </Text>
                    }

                    {
                        existingEmail &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="tomato"
                        >
                            Már létezik felhasználó ezzel az email címmel!
                        </Text>
                    }

                    <Text as="label" htmlFor="usernameInput" mx='1'>
                        Felhasználónév
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="full"
                        placeholder="Felhasználónév"
                        size="3"
                        name="usernameInput"
                        id="usernameInput"
                        mt="2"
                        mb="3"
                        color="tomato"
                        value={inpudData.username}
                        required
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, username: e.target.value })
                        }}
                    />

                    {
                        existingUsername &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="tomato"
                        >
                            A felhasználónév már foglalt!
                        </Text>
                    }

                    <Text as="label" htmlFor="fullNameInput" mx='1'>
                        Teljes név
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="full"
                        placeholder="Minta János"
                        size="3"
                        name="fullNameInput"
                        id="fullNameInput"
                        mt="2"
                        mb="3"
                        color="tomato"
                        value={inpudData.fullName}
                        required
                        onChange={(e) => setInputData({ ...inpudData, fullName: e.target.value })}
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
                        htmlFor="confirmPassword"
                        mx='1'
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Jelszó megerősítése
                    </Text>
                    <PasswordInput
                        inputName="confirmPassword"
                        value={inpudData.confirmPassword}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, confirmPassword: e.target.value })
                        }}
                    />

                    {
                        inpudData.password.length < 8 &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="tomato"
                        >
                            A jelszónak legalább 8 karakter hosszúnak kell lennie!
                        </Text>
                    }

                    {
                        inpudData.password !== inpudData.confirmPassword &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="tomato"
                        >
                            A jelszavak nem egyeznek meg!
                        </Text>
                    }


                    {
                        validEmail && inpudData.email && inpudData.password.length >= 8 && inpudData.password === inpudData.confirmPassword
                            ?
                            loading
                                ?
                                <Button
                                    variant="outline"
                                    mt="4"
                                    mb="3"
                                    size="3"
                                    radius="full"
                                    disabled
                                    color="pink"
                                    style={{
                                        width: '100%'
                                    }}
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
                                    color="pink"
                                    onClick={(e) => handleRegistration(e)}
                                >
                                    Regisztráció
                                </Button>
                            :
                            <Button
                                variant="outline"
                                mt="4"
                                mb="3"
                                size="3"
                                radius="full"
                                color="pink"
                                disabled
                                style={{
                                    width: '100%'
                                }}
                            >
                                Regisztráció
                            </Button>
                    }

                    <Box my="5" style={{ position: "relative", textAlign: "center", opacity: 0.8, userSelect: 'none', cursor: 'default' }} color="pink">
                        <Box
                            style={{
                                height: 1,
                                backgroundColor: "#C36192",
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
                                color: "#C36192"
                            }}
                        >
                            vagy
                        </Text>
                    </Box>

                    <Text
                        as="p"
                        size="3"
                        align="center"
                    >
                        Van már fiókja? Jeletezzen be
                    </Text>


                    <Button
                        variant="outline"
                        mt="4"
                        mb="3"
                        size="3"
                        radius="full"
                        className="loginButton"
                        color="pink"
                        style={{
                            userSelect: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Bejelentkezés
                    </Button>

                </Card>
            </Flex>
        </Container>
    )
}