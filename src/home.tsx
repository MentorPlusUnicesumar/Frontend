import { Box, Flex, Text } from "@chakra-ui/react";
import { Menu } from "./components/menu";
import { CardMentoria } from "./components/card-mentoria";

export function Home() {
    return (
        <Flex w={'full'} h={'full'} flexDir={'column'}>
            <Menu />

            <Flex p='30px' alignItems={'center'} w={'full'} h={'full'} flexDir={'column'}>
                <Text fontSize={'3xl'} fontWeight={'bold'} color={'#1D428A'}>Mentorias</Text>

                <Flex gap={10} mt={'50px'} w={'full'}>
                    <CardMentoria nomeMentoria="Engenharia de Software" mentorName="Renan Rocha" date="28/08/2024"/>
                    <CardMentoria nomeMentoria="Frontal" mentorName="Guilherme Nairne" date="30/08/2024"/>
                    <CardMentoria nomeMentoria="Beck" mentorName="Gabriel Prisco" date="01/09/2024"/>
                </Flex>

            </Flex>
        </Flex>
    )
}