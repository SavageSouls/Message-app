import { useState } from "react"
import { TextField, IconButton } from "@radix-ui/themes";
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";

export default function PasswordInput( { inputName, value, onChange } ) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <TextField.Root
            radius="full"
            placeholder="Jelszó"
            size="3"
            name={inputName}
            id={inputName}
            mb="3"
            type={showPassword ? "text" : "password"}
            color="blue"
            value={value}
            onChange={onChange}
            required
        >
            <TextField.Slot side="right">
                <IconButton
                    style={{
                        color: "#00c4c4",
                        cursor: "pointer",
                    }}
                    variant="ghost"
                    size="3"
                    aria-label={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                    onClick={handleShowPassword}
                >

                    {
                        showPassword ?
                            <LockOpen1Icon height="20" width="20" />
                            :
                            <LockClosedIcon height="20" width="20" />
                    }
                </IconButton>
            </TextField.Slot>
        </TextField.Root>
    )
}