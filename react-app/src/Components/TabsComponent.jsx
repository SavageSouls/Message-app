import { Tabs } from "@radix-ui/themes";
import { useState } from "react"; 

export default function TabsComponent( { options, activeTab, setActiveTab } ) {

    return (
        <Tabs.Root value={activeTab} onValueChange={(option) => {setActiveTab(option)}}>
            <Tabs.List
                color='tomato'
                style={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: "space-around"
                }}

            >
                {
                    Object.keys(options).map( (option, idx) => <Tabs.Trigger key={idx} value={option}>{options[option]}</Tabs.Trigger> )
                }
            </Tabs.List>
        </Tabs.Root>
    )
}