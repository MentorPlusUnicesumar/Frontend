import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import myTheme from "../mytheme";
import { UseMentorias } from "../utils/useMentorias";

type Props = {
  OpenModal: boolean;
  setOpenModal: (open: boolean) => void;
};

export function ModalNotificacoes({ OpenModal, setOpenModal }: Props) {
  const { getMentoriasPendentes, aceitarMentoria } = UseMentorias();
  const toast = useToast();
  const nav = useNavigate();

  const { data } = useQuery({
    queryKey: ["mentorias"],
    queryFn: async () => getMentoriasPendentes(),
  });

  async function handleClick(_id: string, param: "aceitar" | "recusar") {
    try {
      await aceitarMentoria(_id, param);

      setOpenModal(false);

      if (param === "aceitar") {
        toast({
          title: "Mentoria aceita com sucesso!",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
      } else {
        toast({
          title: "Mentoria recusada!",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
      }

      return nav("/minhas-mentorias");
    } catch (error) {
      return toast({
        title: "Erro ao aceitar mentoria",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  return (
    <Modal size={"2xl"} isOpen={OpenModal} onClose={() => setOpenModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
            Notificações
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            w={"full"}
            h={"full"}
            overflow={"auto"}
            flexDir={"column"}
            gap={5}
          >
            {data?.map((mentoria) => (
              <Flex
                w={"full"}
                flexDir={"column"}
                bg={myTheme.colors.cinza_hover}
                p={"10px"}
                borderRadius={"10px"}
              >
                <HStack display={"flex"} justifyContent={"space-between"}>
                  <Text fontSize={"lg"} fontWeight={"bold"}>
                    Novo convite de mentoria
                  </Text>

                  <Box
                    display={"flex"}
                    gap={6}
                    alignItems={"center"}
                    mr={"5px"}
                  >
                    <CloseIcon
                      onClick={() => handleClick(mentoria._id, "recusar")}
                      color={"red"}
                      w={4}
                      h={4}
                    />
                    <CheckIcon
                      onClick={() => handleClick(mentoria._id, "aceitar")}
                      color={"green"}
                      w={5}
                      h={5}
                    />
                  </Box>
                </HStack>

                <Flex flexDir={"column"} mt={"20px"}>
                  <HStack>
                    <Text fontWeight={"bold"}>Mentoria:</Text>
                    <Text>{mentoria.nome}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight={"bold"}>Mentor:</Text>
                    <Text>{mentoria.idMentor.nome}</Text>
                  </HStack>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
