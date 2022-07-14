import { NextPage } from "next";
import {Box,Heading,Container,Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,} from "@chakra-ui/react";
import Layout from "../../components/layout";

const About:NextPage=()=>{
    return(
        <Layout>
            <Heading as="h1" my={2}>自己紹介</Heading>
            <Container maxW='2xl' bg='white' centerContent>
                <Text>開発歴1年のしがない業務システムエンジニアでございます。</Text>
                <Text>仕事内容としては派遣系給与システムをASPで開発保守しております。([FrameWork]ASP.netCore MVC、[O/R]EntityFrameWorkCore、[DB]MySQL)</Text>
                <Text>半年経ったあたりから業務に１ミリも役に立たないReact、NodeJsでのWeb制作に興味を持ち、このブログを作るまでにいたりました。</Text>
                <Text>フロントからサーバーサイドまで幅広く、自分なりのwikiを書き殴ります。</Text>
                <Heading as="h2" borderBottom={1}>技術</Heading>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        </Tbody>
                        <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
                <Heading as="h2" borderBottom={1}>趣味</Heading>
                <Heading as="h2" borderBottom={1}>野望</Heading>
            </Container>
        </Layout>
    )
}