import { TextField, IconButton } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function SearchNewFriend( { handleSearchNewFriend } ) {
    const [searchText, setSearchText] = useState('');

    return (
        <TextField.Root
            radius="full"
            placeholder="Ismerősök keresése"
            m='1'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            color="tomato"
        >
             <TextField.Slot side="right">
                <IconButton
                    style={{
                        color: "#00acac",
                        cursor: "pointer",
                    }}
                    variant="ghost"
                    size="2"
                    onClick={() => handleSearchNewFriend(searchText)}
                >
                    <MagnifyingGlassIcon height="20" width="20" />
                </IconButton>
            </TextField.Slot>
        </TextField.Root>
    )
}