import { Box, Flex, Text } from "@chakra-ui/react";
import { CardMentoria } from "./components/CardMentoria";
import { Menu } from "./components/Menu";

export function Home() {
    return (
        <Flex w={'full'} h={'full'} flexDir={'column'}>
            <Menu />

            <Flex p='50px' alignItems={'center'} w={'full'} h={'full'} flexDir={'column'}>
                <Text fontSize={'3xl'} fontWeight={'bold'} color={'#1D428A'}>Mentorias</Text>

                <Flex gap={10} mt={'50px'} w={'full'}>  
                    <CardMentoria nomeMentoria="Engenharia de Software" mentorName="Renan Rocha" date="28/08/2024"/>
                    <CardMentoria nomeMentoria="Comunicação" mentorName="Pedro Mazzurana" date="30/08/2024"/>
                    <CardMentoria nomeMentoria="Business intelligence" mentorName="Gabriel Prisco" date="01/09/2024"/>
                </Flex>

            </Flex>
        </Flex>
    )
}