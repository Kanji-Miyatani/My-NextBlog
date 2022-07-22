import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Icon,
  Link
} from "@chakra-ui/react";
import {
    AiFillInstagram
  } from 'react-icons/ai';
import NextImage from 'next/image'
import NextLink from 'next/link'
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={3}
      bg="gray.500"
      color="white"
      display={{ base: "none", md: "flex" }}
    >
      <Flex align="center" mr={5}>
        <NextLink href="/">
          <Link>
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                <NextImage src="/images/やかんロゴ.png"
                    width={300}
                    height={50}
                    />
            </Heading>
          </Link>
        </NextLink>
      </Flex>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
       
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant="outline"
        >
          Q&A
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
