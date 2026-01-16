import { Card, Avatar, Box, Text, Flex, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export default function SearchCard( { user, currentUserId, addFriend } ) {
    
    return (
        <Card>
            <Flex gap="3" align="center" direction="row" justify='between'>
			    <Avatar
			    	size="3"
			    	radius="large"
			    	fallback={`${user.full_name.charAt(0)}${user.full_name.split(' ')[1].charAt(0)}`}
                    variant='solid'
                    color='tomato'
			    />
			    <Box>
			    	<Text as="div" size="2" weight="bold">
			    		{user.full_name}
			    	</Text>
			    	<Text as="div" size="2" color="gray">
			    		{user.username}
			    	</Text>

			    </Box>
                <Box>
                    {
                        user.accepted === null &&
                        <Button 
                            radius='full'
                            style={{ cursor: 'pointer', background: 'linear-gradient(45deg, #B55586, #EF652C)' }}
                            onClick={() => addFriend(user)}
                        >
                            <PlusIcon height='20px' width='20px' />Felvétel
                        </Button> 
                    }

                    {
                        (user.accepted === false && user.requester_id === currentUserId) &&
                        <Button radius='full' disabled style={{ cursor: 'default', background: 'linear-gradient(45deg, #B55586, #EF652C)', color: 'white', opacity: '0.5' }}>
                            Folyamatban
                        </Button> 
                    }

                    {
                        (user.accepted === false && user.addressee_id === currentUserId) &&
                        <Button radius='full' disabled style={{ cursor: 'default', background: 'linear-gradient(45deg, #B55586, #EF652C)', color: 'white', opacity: '0.5', height: '40px' }}>
                            Kérelem érkezett
                        </Button> 
                    }

                    {
                        user.accepted === true &&
                        <Button radius='full' disabled style={{ cursor: 'default', background: 'linear-gradient(45deg, #B55586, #EF652C)', color: 'white', opacity: '0.5' }} p='2' >
                            Ismerős
                        </Button> 
                    }
			    </Box>
		    </Flex>
        </Card>
    )

}