import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface Props {
  name?: string;
  placeholder: string;
  mt?: string;
  w?: string;
}

export function TextInput({ name, placeholder, mt, w }: Props) {
  return (
    <Box w="400px" mt={mt}>
      {name && (
        <Text fontSize="lg" fontWeight="bold" color="#05234E">
          {name}
        </Text>
      )}
      <Input
        mt="10px"
        w={w}
        h="35px"
        borderWidth="2px"
        borderColor="#ECECEC"
        borderRadius="5px"
        placeholder={placeholder}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
        bg="white"
        sx={{
          "::placeholder": {
            fontSize: "12px",
            color: "#B0B0B0",
          },
        }}
      />
    </Box>
  );
}
