import { Box, Button, Flex, Progress, Step, StepIcon, StepIndicator, StepStatus, Stepper, Text, useSteps } from "@chakra-ui/react";
import { TextInputCadastro } from "../../components/textInputCadastro";
import { useState } from "react";

export function AbaMentor() {
    const [activeStep, setActiveStep] = useState(0);

    console.log(activeStep);

    const steps = [
        { title: 'Primeiro passo', description: 'Informações pessoais' },
        { title: 'Segundo passo', description: 'Informações profissionais' },
    ];    

    const progressPercent = (activeStep / (steps.length - 1)) * 100;

    function setStep(acao: string) {
        console.log('Cai no avancar')
        if (acao === 'Avancar' && activeStep === 0) {
            setActiveStep(1);
        } 
        if (acao === 'Voltar' && activeStep === 1) {
            console.log('Cai no voltar')
            setActiveStep(0);
        }
    }

    return (
        <Flex flexDir={'column'} w={'full'}>
            <Flex justifyContent={'center'}>
                <Box position='relative' mt={'10px'} w={'400px'}>
                    <Stepper size='sm' index={activeStep} gap='0'>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator bg='white'>
                                    <StepStatus complete={<StepIcon />} />
                                </StepIndicator>
                            </Step>
                        ))}
                    </Stepper>
                    <Progress
                        value={progressPercent}
                        position='absolute'
                        height='3px'
                        width='full'
                        top='10px'
                        zIndex={-1}
                    />
                </Box>
            </Flex>

            <Box gap={2} display={'flex'} flexDir={'row'} mt={'20px'}>
                <TextInputCadastro w="370px" placeholder="Nome completo" name="nome" />
                <TextInputCadastro w="370px" placeholder="E-mail" name="email" />
            </Box>

            <Box mt={'20px'} gap={2} display={'flex'} flexDir={'row'}>
                <TextInputCadastro w="370px" placeholder="Telefone" name="telefone" />
                <TextInputCadastro w="370px" placeholder="CPF" name="CPF" />
            </Box>

            <Box gap={2} display={'flex'} mt={'15px'} flexDir={'row'}>
                <TextInputCadastro w="370px" placeholder="Cidade" name="cidade" />
                <TextInputCadastro w="370px" placeholder="UF" name="UF" />
            </Box>

            <Box mt={'15px'} gap={2} display={'flex'} flexDir={'row'}>
                <TextInputCadastro w="370px" placeholder="Senha" name="senha" />
                <TextInputCadastro w="370px" placeholder="Foto de perfil" name="Foto de perfil" />
            </Box>


            <Box mt={'8%'} display={'flex'} justifyContent={'center'} gap={5}>
                <Button
                    w={"170px"}
                    borderRadius={"10px"}
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                    onClick={() => setStep('Voltar')}
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                    bg={"#1D428A"}
                >
                    <Text color={"white"} fontSize={"sm"} fontWeight={"bold"} onClick={() => setStep('Voltar')}>
                    {activeStep === 0 ? "Cancelar" : "Voltar"}
                    </Text>
                </Button>
                <Button
                    w={"170px"}
                    borderRadius={"10px"}
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                    onClick={() => setStep('Avancar')}
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                    bg={"#1D428A"}
                >
                    <Text color={"white"} fontSize={"sm"} fontWeight={"bold"}>
                        {activeStep === 0 ? "Próximo" : "Enviar cadastro"}
                    </Text>
                </Button>
            </Box>
        </Flex>
    )
}