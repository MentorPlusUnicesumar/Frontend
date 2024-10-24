import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";

interface TrabCard {
  trabName: string;
  trabImage: string;
}

export function CardTrab({ trabName, trabImage }: TrabCard) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      w="200px" // Reduzindo o tamanho do card
      h="270px" // Reduzindo a altura do card
      bg="white"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      position="relative"
      transition="box-shadow 0.3s ease-in-out"
      borderRadius={"10px"}
    >
      <Image
        src={trabImage}
        w="100%"
        h="150px"
        objectFit="cover"
        borderTopRadius={"10px"}
      />

      <VStack p="10px" align="start">
        <Text fontWeight="bold" fontSize="md" color="#1D428A">
          {trabName}
        </Text>
      </VStack>
      {/* FAZER O BOTAO */}
    </Box>
  );
}
