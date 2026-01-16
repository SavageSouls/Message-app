import { Flex } from "@radix-ui/themes";
import Sidebar from "../Components/SideBar";
import ChatComponent from "../Components/ChatComponent";
import { useState, useEffect } from "react";

export default function ChatsPage( { loading, setLoading, userData } ) {
  const [tabsOptions, setTabsOptions] = useState(
    {
      chats: 'Csevegések',
      friends: 'Ismerősök',
      search: 'Keresés'
    }
  );
  const [activeTab, setActiveTab] = useState("chats");
  const [cardsData, setCardsData] = useState([]);
  const [chat, setChat] = useState([]);

  const handleSearchNewFriend = (searchText) => {
    
    if (searchText.length !== 0) {
      fetch(`/api/search?q=${encodeURIComponent(searchText.trim())}&userId=${userData.id}`)
        .then( async (res) => {
          const result = await res.json();
          console.log(result)
        })
        .catch(console.warn)
    }
  }

  return (
    <Flex direction="row" height="100vh" width="100vw" justify="space-between" align="center">

      <Sidebar options={tabsOptions} activeTab={activeTab} setActiveTab={setActiveTab} handleSearchNewFriend={handleSearchNewFriend} />
      <ChatComponent chat={chat} />
      
    </Flex>
  )
}