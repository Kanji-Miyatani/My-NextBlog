import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Divider,
  InputRightElement,
  InputGroup,
  Button,
  Input,
  Heading
} from '@chakra-ui/react';
import NextLink from 'next/link'
import {FaSearch} from "react-icons/fa"
import {
  FiHome,
  FiTrendingUp,
  FiStar,
  FiBook,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
  import {
    SiDotnet,
    SiReact,
    SiUnity
  } from 'react-icons/si'; 
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Image from 'next/image'
import MyProfile from './myProfile';
import { ICategories } from '../interface/article';
type Prop={
  
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  link :string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'ホーム', icon: FiHome ,link:"/" },
  { name: '作品', icon: FiBook ,link:"/artworks" },
  { name: 'ブログ', icon: FiStar ,link:"/page/1" }
];

const CategoryItems: Array<LinkItemProps> = [
    { name: 'ウェブ開発', icon: SiReact ,link:"category/web/page/1" },
    { name: '設計思想', icon: SiReact ,link:"category/design/page/1" },
    { name: '効率化', icon: SiDotnet ,link:"category/optimization/page/1" },
    { name: 'チュートリアル', icon: FiStar ,link:"category/tutorial/page/1" }
  ];

export default function SimpleSidebar({ children}: { children: ReactNode}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" 
    className="class" 
    display={"flex"}
    w={{base:"100%",sm:"1160px"}}
    mx={{base:0,sm:"auto"}}
    flexDirection={{base:"column",md:"row"}}>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} bgColor="teal.500" onOpen={onOpen} />
       <Box minH="100vh" p={{sm:4,base:2}} w="100%">
        {children}
      </Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="sm">
        <DrawerOverlay/>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
     

    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'teal.900')}
      borderLeft="1px"
      borderLeftColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius="0px"
      top={2}
      w={{ base: "100%", md: 64 }}
      my={{ base: 0, md: 3}}
      ml={{ base: 0, md: 3}}
      pos={{ base: 'initial', md: "sticky"}}
      h={{ base: "100vh", md: "800px"}}
      {...rest}>
      <Flex h="10" display={{ base: 'flex', md: 'none' }} alignItems="center" mx="2" w={"100%"} justifyContent="space-between">
        <CloseButton onClick={onClose} />
      </Flex>
      <Box 
      className='navLinks' 
      shadow="md"
      mb={2} mt={2} mx={2} p={"3px"} 
      border={"1px"} borderColor={"gray.100"} borderRadius="5px"
      py="0.5rem">
        <Flex h="20" alignItems="center" mx="3" justifyContent="space-between">
          <InputGroup size='md'>
            <Input
              pr='5rem'
              placeholder='Search'
            />
            <InputRightElement width='3rem'>
              <Button h='1.95rem' size='sm'>
                  <Icon
                      fontSize="16"
                      _groupHover={{
                        color: 'white',
                      }}
                      as={FaSearch}
                    />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
        {LinkItems.map((link,i) => (
          <NavItem key={i} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}
        <Divider color={useColorModeValue('gray.200', 'gray.700')} mb={2} mt={2} />
        {CategoryItems.map((link,i) => (
          <NavItem key={i} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box display={{md:"block",base:"none"}}>
        <MyProfile/>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link : string;
  children: ReactText;
}
const NavItem = ({ icon,link, children, ...rest }: NavItemProps) => {
  return (
    <NextLink href={link}>
        <Link  style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="2.5"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'teal.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'teal.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('teal.200', 'teal.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu color='white' />}
      />
    <Box pl="2" pt="2">
        <Image src="/images/やかんロゴ.png"
            width={300}
            height={50}
            alt="ロゴ"
            />
    </Box>
    </Flex>
  );
};
