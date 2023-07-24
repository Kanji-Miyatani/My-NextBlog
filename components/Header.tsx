import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Link
} from "@chakra-ui/react";
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
      padding={2}
      bg="teal.400"
      color="white"
      display={{ base: "none", md: "flex" }}
    >
      <Flex align="center" mr={5}>
        <NextLink href="/">
          <Link>
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                <NextImage src="/images/YakanBlogHead-min.png"
                    width={220}
                    height={49}
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
        <a target="_blank" rel="noreferrer noopener" href="https://docs.google.com/forms/d/e/1FAIpQLSdfzaFNZ--xRiYA15fiD3w8Jd71rlERllqlhTZOyQsJM-p88w/viewform?usp=sf_link">
          <Button
            variant="outline"
          >
            ご質問・ご意見
          </Button>
        </a>
      </Box>
    </Flex>
  );
};

export default Header;
