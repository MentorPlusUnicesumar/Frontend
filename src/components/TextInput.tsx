import { Box, Input, Text } from "@chakra-ui/react";
interface props{
    name:string
    placeholder:string
    mt:string

}
export function TextInput({name, placeholder, mt}:props){
    return(
        <Box w={'400px'} mt={mt}>
                    <Text fontSize={'lg'}  fontWeight={'bold'} color={'#05234E'}>{name}</Text>
                    <Input
                        mt="10px"
                        w={'400px'}
                        h={'35px'}
                        borderWidth={'2px'}
                        borderColor={'#ECECEC'}
                        borderRadius={'10px'}
                        placeholder={placeholder}
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" bg={'white'}
                        sx={{
                            '::placeholder': {
                                fontSize: '12px', 
                                color: '#B0B0B0', 
                            }
                        }}
                    />
                </Box>
    )
}