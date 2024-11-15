import {
  Box,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { UseMentorias } from "../utils/useMentorias";
import { useQuery } from "react-query";
import myTheme from "../mytheme";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

type Props = {
  OpenModal: boolean;
  setOpenModal: (open: boolean) => void;
};

export function ModalNotificacoes({ OpenModal, setOpenModal }: Props) {
  const { getMentoriasPendentes } = UseMentorias();

  const { data } = useQuery({
    queryKey: ["mentorias"],
    queryFn: async () => getMentoriasPendentes(),
  });

  console.log(data);

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
          <Flex w={"full"} h={"full"} overflow={"auto"}>
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
                    <CloseIcon color={"red"} w={4} h={4} />
                    <CheckIcon color={"green"} w={5} h={5} />
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
