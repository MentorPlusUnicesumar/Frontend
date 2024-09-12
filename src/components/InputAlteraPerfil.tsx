import { Box, Text, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface InputAlteraPerfilProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputAlteraPerfil: React.FC<InputAlteraPerfilProps> = ({ label, name, value, onChange }) => {
  return (
    <Box w={"full"}>
      <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
        {label}
      </Text>
      <Input
        name={name}
        mt="10px"
        w={"full"}
        h={"35px"}
        borderWidth={"2px"}
        borderColor={"#ECECEC"}
        borderRadius={"10px"}
        value={value}
        onChange={onChange}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
        bg={"white"}
      />
    </Box>
  );
};

export default InputAlteraPerfil;
