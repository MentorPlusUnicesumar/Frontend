import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import myTheme from "../../mytheme";
import { UseAdmin } from "../../utils/useAdmin";

type CreateType = {
  nome: string;
};

type props = {
  OpenModalCreate: boolean;
  setOpenModalCrate: (open: boolean) => void;
};

export function CriarNovaArea({ OpenModalCreate, setOpenModalCrate }: props) {
  const { createArea } = UseAdmin();
  const toast = useToast();

  const InicialValues = {
    nome: "",
  };

  async function handleCreate({ nome }: CreateType) {
    try {
      await createArea(nome);

      setOpenModalCrate(false);

      return toast({
        title: "Área criada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    } catch (error) {
      await createArea(nome);

      setOpenModalCrate(false);

      return toast({
        title: "Erro ao criar área!",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  return (
    <Modal
      size={"xl"}
      isOpen={OpenModalCreate}
      onClose={() => setOpenModalCrate(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
            Criar Nova Área
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems={"center"} flexDir={"column"} w={"full"} h={"full"}>
            <Formik initialValues={InicialValues} onSubmit={handleCreate}>
              {({ handleSubmit, handleChange, values, setFieldValue }) => (
                <>
                  <Box w={"full"} mt={"30px"}>
                    <Text fontSize="lg" fontWeight="bold" color="#05234E">
                      Nome da Área
                    </Text>
                    <Input
                      mt="10px"
                      w={"full"}
                      h="35px"
                      borderColor="#ECECEC"
                      borderRadius="5px"
                      name="nome"
                      onChange={(value) => {
                        handleChange("nome")(value);
                      }}
                      value={values.nome}
                      placeholder={"Informe o nome da área"}
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                      bg="white"
                      sx={{
                        "::placeholder": {
                          fontSize: "12px",
                          color: "#B0B0B0",
                        },
                      }}
                    />
                  </Box>

                  <Button
                    mt={"50px"}
                    h={"35px"}
                    w={"120px"}
                    borderRadius={"10px"}
                    onClick={() => handleSubmit()}
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                    _hover={{
                      transform: "scale(1.05)",
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    bg={myTheme.colors.azul_claro}
                  >
                    <Text
                      color={"white"}
                      fontSize={"sm"}
                      fontWeight={"semi-bold"}
                    >
                      Criar
                    </Text>
                  </Button>
                </>
              )}
            </Formik>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
