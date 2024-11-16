import {
  Box,
  Button,
  Flex,
  Img,
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
import { UseAdmin } from "../../utils/useAdmin";
import myTheme from "../../mytheme";

type Props = {
  id: string;
  OpenModalUser: boolean;
  setOpenModalUser: (open: boolean) => void;
};

export function ModalPerfilUsuario({
  OpenModalUser,
  setOpenModalUser,
  id,
}: Props) {
  const { getUsuariosById, statusUsuaruio } = UseAdmin();
  const toast = useToast();

  const { data } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => getUsuariosById(id),
  });

  async function atualizaStatus(status: string) {
    try {
      await statusUsuaruio(id, status);

      setOpenModalUser(false);

      return toast({
        title: status === "Aprovado" ? "Usuário ativado" : "Usuário inativado",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    } catch (error) {
      return toast({
        title:
          status === "Aprovado"
            ? "Erro ao ativar usuário"
            : "Erro ao inativar usuário",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  console.log("data", data?.disponivel);

  return (
    <Modal
      size={"2xl"}
      isOpen={OpenModalUser}
      onClose={() => setOpenModalUser(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
            Perfil do usuário
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            flexDir={"column"}
            gap={3}
            mt={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              display={"flex"}
              flexDir={"row"}
              gap={3}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Img
                w="100px"
                h={"100px"}
                borderRadius={"full"}
                src={data?.fotos}
              />
              <Box>
                <Text fontWeight={"bold"}>{data?.nome}</Text>
                <Text>{data?.email}</Text>
                <Text
                  color={data?.disponivel ? "green" : myTheme.colors.vermelho}
                >
                  {data?.disponivel
                    ? "Disponível para mentorias"
                    : "Não disponível para mentorias"}
                </Text>
              </Box>
            </Box>

            <Box mt={"20px"} display={"flex"} flexDir={"row"} gap={"100px"}>
              <Flex>
                <Box>
                  <Text fontWeight={"bold"}>
                    {data?.typeUser === "Mentor"
                      ? "Áreas de especialidade"
                      : "Áreas de interesse"}
                  </Text>
                  {data?.areas?.map((area) => (
                    <Text>{area.nome}</Text>
                  ))}
                </Box>
              </Flex>
              <Flex>
                <Box>
                  <Text fontWeight={"bold"}>Mentorias ativas</Text>
                  {data?.mentoriasAtivas?.map((mentoria) => (
                    <Text>{mentoria.nome}</Text>
                  ))}
                </Box>
              </Flex>
            </Box>
            <Button
              onClick={() =>
                atualizaStatus(
                  data?.status === "Inativo" ? "Aprovado" : "Inativo"
                )
              }
              mt={"50px"}
              mb={"20px"}
              w={"200px"}
              h={"40px"}
              borderRadius={"10px"}
              bg={"linear-gradient(to right, #000024 60%, #000030 100%)"}
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <Text fontWeight={"bold"} color={"white"}>
                {data?.status === "Inativo"
                  ? "Ativar perfil"
                  : "Desativar perfil"}
              </Text>
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
