import { Box, Button, Image, Text, VStack, List, ListItem } from "@chakra-ui/react";
import { useState } from "react";

interface MentorCardProps {
  mentorName: string;
  mentorImage: string;
  specialties: string[];
}

export function MentorCard({ mentorName, mentorImage, specialties }: MentorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      w="200px" // Reduzindo o tamanho do card
      h="350px" // Reduzindo a altura do card
      bg="white"
      borderRadius="10px"
      overflow="hidden"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
      transition="box-shadow 0.3s ease-in-out"
      
    >
      <Image src={mentorImage} w="100%" h="150px" objectFit="cover" />

      <VStack p="10px" align="start">
        <Text fontWeight="bold" fontSize="md" color="#1D428A">
          {mentorName}
        </Text>
        <List spacing={1}>
          {specialties.map((specialty, index) => (
            <ListItem key={index} color="#1D428A" fontSize="sm">
              • {specialty}
            </ListItem>
          ))}
        </List>
      </VStack>

      {/* O botão Ver Mais só aparece ao passar o mouse */}
      <Button
        w="full"
        h="40px"
        bg="#1D428A"
        color="white"
        borderRadius="0"
        position="absolute"
        bottom={isHovered ? "0" : "-40px"} // Controla a visibilidade com hover
        transition="bottom 0.3s ease-in-out"
        _hover={{ bg: "#05234E" }}
      >
        Ver mais
      </Button>
    </Box>
  );
}
