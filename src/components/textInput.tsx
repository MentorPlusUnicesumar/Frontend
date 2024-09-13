import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import myTheme from "../mytheme";

interface Props {
  name?: string;
  placeholder: string;
  mt?: string;
  w?: string;
  value?: string;
}

export function TextInput({ name, placeholder, value, mt, w }: Props) {
  return (
    <Box w={w} mt={mt}>
      {name && (
        <Text fontSize="lg" fontWeight="bold" color={myTheme.colors.azul}>
          {name}
        </Text>
      )}
      <Input
        mt="10px"
        h="35px"
        value={value}
        borderWidth="2px"
        borderColor="#ECECEC"
        borderRadius="10px"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
        bg="white"
        sx={{
          "::placeholder": {
            fontSize: "12px",
            color: "#B0B0B0",
          },
        }}
        placeholder={placeholder}
      />
    </Box>
  );
}
