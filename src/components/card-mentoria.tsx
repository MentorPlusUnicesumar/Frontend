import { Box, Flex, Text } from "@chakra-ui/react";

interface props{
    nomeMentoria:string
    mentorName:string
    date:string
}

export function CardMentoria({nomeMentoria, mentorName, date}:props){
    return(
        <Flex
                        _hover={{
                            transform: 'scale(1.05)',
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)',
                            transition: 'transform 0.2s ease-in-out',
                        }}
                        flexDir={'column'} bg={'white'} w={'200px'} h={'200px'} borderRadius={'10px'} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" >
                        <Box px={'5px'} w={'full'} h={'60px'} borderTopRadius="10px" bgGradient="linear(to-r, #004DB8, #003C8F)">
                            <Text color={'white'} fontSize={'lg'} fontWeight={'bold'} p={'5px'}>{nomeMentoria}</Text>
                        </Box>

                        <Box borderBottomRadius={'10px'} p={'5px'} bg={'#F2F2F2'} w={'full'} h={'full'}>
                            <Box>
                                <Text fontSize={'md'} fontWeight={'hairline'} color={'#1D428A'}>Mentor:</Text>
                                <Text fontSize={'md'} fontWeight={'bold'} color={'#1D428A'}>{mentorName}</Text>
                            </Box>
                            <Box mt={'5px'}>
                                <Text fontSize={'md'} fontWeight={'hairline'} color={'#1D428A'}>Próximo encontro:</Text>
                                <Text fontSize={'md'} fontWeight={'bold'} color={'#1D428A'}>{date}</Text>
                            </Box>
                        </Box>
                    </Flex>
    )
}