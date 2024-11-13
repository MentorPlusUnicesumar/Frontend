import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface Props {
  name?: string;
  placeholder: string;
  mt?: string;
  w?: string;
  value: string | null;
  onChange: (value: string) => void;
}

export function TextInputCadastro({ name, placeholder, mt, w, value, onChange }: Props) {
  return (
    <Box w="400px" mt={mt}>
      {name && (
        <Text fontSize="md" fontWeight="bold" color="#05234E">
          {name}
        </Text>
      )}
      <Input
        mt="5px"
        w={w}
        h="35px"
        value={value || undefined}
        onChange={(e) => onChange(e.target.value)}
        borderColor="#ECECEC"
        borderRadius="5px"
        placeholder={placeholder}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        bg="white"
        sx={{
          "::placeholder": {
            fontSize: "14px",
            color: "#B0B0B0",
            fontWeight: "bold"
          },
        }}
      />
    </Box>
  );
}
