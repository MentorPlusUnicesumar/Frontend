import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import myTheme from "../mytheme";

interface props {
  nomeMentoria: string;
  mentorName: string;
  date: string;
  id: string;
}

export function CardMentoriaAluno({ nomeMentoria, mentorName, date, id }: props) {
  const navigate = useNavigate();

  return (
    <Link
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      onClick={() => navigate(`/mentoria/${id}`)}
    >
      <Flex
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.2s ease-in-out",
        }}
        flexDir={"column"}
        bg={"white"}
        w={"200px"}
        h={"200px"}
        borderRadius={"10px"}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
      >
        <Box
          px={"5px"}
          w={"full"}
          minHeight={"60px"}
          borderTopRadius="10px"
          bgGradient="linear(to-r, #000024 10%, #0D0D42 100%)"
          // bg={myTheme.colors.azul_claro}
        >
          <Text color={"white"} fontSize={"lg"} fontWeight={"bold"} p={"5px"}>
            {nomeMentoria}
          </Text>
        </Box>

        <Box
          borderBottomRadius={"10px"}
          p={"5px"}
          bg={"#F2F2F2"}
          w={"full"}
          h={"full"}
        >
          <Box>
            <Text
              fontSize={"md"}
              fontWeight={"light"}
              color={myTheme.colors.azul}
            >
              Mentor:
            </Text>
            <Text
              fontSize={"md"}
              fontWeight={"bold"}
              color={myTheme.colors.azul}
            >
              {mentorName}
            </Text>
          </Box>
          <Box mt={"5px"}>
            <Text
              fontSize={"md"}
              fontWeight={"light"}
              color={myTheme.colors.azul}
            >
              Próximo encontro:
            </Text>
            <Text
              fontSize={"md"}
              fontWeight={"bold"}
              color={myTheme.colors.azul}
            >
              {date}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}
