import { Flex } from "@radix-ui/themes";
import SideBar from "../Components/SideBar";
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
      
      setLoading(true)

      fetch(`/api/search?q=${encodeURIComponent(searchText.trim())}&userId=${userData.id}`)
        .then( async (resJSON) => {
          const res = await resJSON.json();
          setCardsData(res);
        })
        .catch(console.warn)
        .finally( () => {
          setLoading(false);
        })
    }
  }

  const handleAddFriend = async (user) => {
    setCardsData( (prev) => (
      prev.map( (u) => (
        u.user_id === user.user_id
          ?
            { ...u, accepted: false, requester_id: userData.id, addressee_id: user.user_id }
          :
            u
      ))
    ));
  }

  return (
    <Flex direction="row" height="100vh" width="100vw" justify="space-between" align="center">

      <Sidebar 
        loading={loading}
        options={tabsOptions}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleSearchNewFriend={handleSearchNewFriend}
        cardsData={cardsData}
        addFriend={handleAddFriend}
        currentUserId={userData.id}
      />
      <ChatComponent chat={chat} />
      
    </Flex>
  )
}