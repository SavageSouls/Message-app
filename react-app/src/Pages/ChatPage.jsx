import { Flex } from "@radix-ui/themes";
import SideBar from "../Components/SideBar";
import ChatComponent from "../Components/ChatComponent";
import { useState, useEffect } from "react";

export default function ChatPage( { loading, setLoading, userData, toastData, setToastData  } ) {
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

  const handleAddFriend = (user) => {
    setCardsData( (prev) => (
      prev.map( (u) => (
        u.user_id === user.user_id
          ?
            { ...u, accepted: false, requester_id: userData.id, addressee_id: user.user_id }
          :
            u
      ))
    ));

    fetch('/api/add_friend', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requesterId: userData.id,
        addresseeId: user.user_id
      })
    })
      .then( async (resJSON) => {
        const res = await resJSON.json();
        console.log(res)
      })
      .catch( (err) => {
        setCardsData( prev => (
          prev.map(u => (
            u.user_id === user.user_id
              ?
                {
                  ...u,
                  accepted: null,
                  requester_id: null,
                  addressee_id: null
                }
              :
                u
          ))
        ))

        setToastData( { open: true, title: 'Sikertelen felvétel', description: 'A kérelem küldése során hiba lépett fel, kérjük próbálja újra, vagy ellenőrizze az ismerősök listáját.', isError: true } );

      });
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