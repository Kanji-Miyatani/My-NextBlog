import React from 'react'
import NextLink from 'next/link'
import{Box,Breadcrumb,BreadcrumbItem,BreadcrumbLink,Flex}from '@chakra-ui/react'
import {AiOutlineRight,AiFillHome, } from 'react-icons/ai'



function BreadCrumb() {
  return (
    <Breadcrumb mx="auto" spacing='8px' separator={<AiOutlineRight color='' />} textAlign="center">
        <BreadcrumbItem>
            <BreadcrumbLink href='#'>
                <Flex alignItems="">
                    <AiFillHome/>
                    <Box ml="1">Home</Box>
                </Flex>
            </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
            <BreadcrumbLink href='#'>About</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
        </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadCrumb