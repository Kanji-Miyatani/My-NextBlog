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

interface LinkItemProps {
  name: string;
  icon: IconType;
  link :string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'ホーム', icon: FiHome ,link:"/" },
  { name: '作品', icon: FiBook ,link:"/Works" },
  { name: 'ランキング', icon: FiStar ,link:"/Contact" }
];

const CategoryItems: Array<LinkItemProps> = [
    { name: 'React', icon: SiReact ,link:"/" },
    { name: 'ASP.net', icon: SiDotnet ,link:"/About" },
    { name: 'Unity', icon: SiUnity ,link:"/Works" },
    { name: '日常', icon: FiStar ,link:"/Contact" }
  ];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} className="class">
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
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 64 }} minH="100vh" p="4">
        {children}
      </Box>

    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius="6px"
      ml="3"
      mt="3"
      w={{ base: 'full', md: 64 }}
      pos="fixed"
      h="800px"
      {...rest}>
      <Flex h="10" display={{ base: 'flex', md: 'none' }} alignItems="center" mx="2" justifyContent="space-between">
        <CloseButton onClick={onClose} />
      </Flex>
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
        <NavItem key={i} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Divider mb={2} mt={2} />
      {CategoryItems.map((link,i) => (
        <NavItem key={i} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Box display={{md:"block",base:"none"}}>
        <IntroductionCard/>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2.5"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.400',
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
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    <Box pl="2" pt="2">
        <Image src="/images/やかんロゴ.png"
            width={300}
            height={50}
            />
    </Box>
    </Flex>
  );
};

const IntroductionCard=()=>{
  return(
    <Box display={"flex"}
         mb={2} mt={2} mx={2} p={"3px"} 
        border={"1px"} borderColor={"gray.100"} borderRadius="5px"
        shadow="md" flexDirection="column" alignItems={"center"}>
     <Box display={"flex"} h={"80px"} m={3}>
       <Box borderRadius={"50%"} overflow="hidden">
         <Image src="/images/yakanKun.png" layout="fixed" objectFit="cover" height={80}width={80} />
       </Box>
       <Heading as='h4' size='md' w="50%" padding={"auto"} ml={3} my={"auto"} textAlign={"left"}>
       Kanji Miyatani
       </Heading>
     </Box>
     <Box m={3}>
       <Text fontSize='15px' >
         駆け出しエンジニア1年。<br/>趣味の制作はWebアプリ中心。<br/>仕事は業務系なのでC#メインで書いてます。
       </Text>
     </Box>
   </Box>
  )
}