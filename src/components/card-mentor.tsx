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
import { useNavigate } from "react-router-dom";
import myTheme from "../mytheme";
import { areas } from "../utils/useMentor";

interface MentorCardProps {
  mentorName?: string;
  mentorImage?: string;
  areas?: areas[];
  id: string
}

export function MentorCard({
  mentorName,
  mentorImage,
  areas,
  id
}: MentorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      w="200px"
      h="310px"
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
        <Text fontWeight="bold" fontSize="md" color={myTheme.colors.azul}>
          {mentorName}
        </Text>
        <List spacing={1}>
          {areas?.slice(0, 3).map((area, index) => (
            <ListItem key={index} color={myTheme.colors.azul} fontSize="sm">
              • {area.nome}
            </ListItem>
          ))}
        </List>
      </VStack>

      <Button
        w="full"
        h="40px"
        bg={myTheme.colors.azul}
        color="white"
        borderRadius="0"
        position="absolute"
        bottom={isHovered ? "0" : "-40px"}
        transition="bottom 0.3s ease-in-out"
        _hover={{ bg: myTheme.colors.azul }}
        onClick={() => navigate(`/perfil-mentor/${id}`)}
      >
        Ver mais
      </Button>
    </Box>
  );
}
