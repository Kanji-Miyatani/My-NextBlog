import React, { ChangeEvent, ReactNode, useState } from 'react';
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
  FiStar,
  FiBook,
  FiMenu,
} from 'react-icons/fi';
import {
  MdToday
} from 'react-icons/md';
import {VscDebugBreakpointLogUnverified} from "react-icons/vsc"
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Image from 'next/image'
import MyProfile from './myProfile';
import {useRouter} from 'next/router' 


interface LinkItemProps {
  name: string;
  icon: IconType ;
  link :string;
}
//メニュー一覧
const LinkItems: Array<LinkItemProps> = [
  { name: 'ホーム', icon: FiHome ,link:"/" },
  { name: '作品', icon: FiBook ,link:"/artworks" },
  { name: 'ブログ', icon: FiStar ,link:"/page/1" }
];
//カテゴリ一覧
const CategoryItems: Array<LinkItemProps> = [
    { name: 'Web開発', icon: VscDebugBreakpointLogUnverified ,link:"/category/web/page/1" },
    { name: 'デザイン・設計', icon: VscDebugBreakpointLogUnverified ,link:"/category/design/page/1" },
    { name: '効率化', icon: VscDebugBreakpointLogUnverified ,link:"/category/optimization/page/1" },
    { name: 'チュートリアル', icon: VscDebugBreakpointLogUnverified ,link:"/category/tutorial/page/1" },
    { name: '日記', icon: MdToday ,link:"/category/diary/page/1" }
  ];
//レイアウトのボディ
export default function SimpleSidebar({ children}: { children: ReactNode}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" 
    display={"flex"}
    maxW={{base:"100%",md:"720px",lg:"1160px"}}
    mx={{base:0,md:"auto"}}
    flexDirection={{base:"column",md:"row"}}
    >
        <MobileNav display={{ base: 'flex', md: 'none' }} bgColor="teal.400" onOpen={onOpen} />
        <Box minH="100vh" p={{md:4,base:0}} w={{md:"77%",base:"100%"}}>
          {children}
        </Box>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="md">
          <DrawerOverlay/>
          <DrawerContent 
          h="100vh">
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
     

    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
//PCモバイル共通のメニューバーコンポーネント
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [sWord,setSWord]=useState("");
  const router = useRouter();
  const onSerachSubmit=(e:React.MouseEvent<HTMLElement, MouseEvent>)=>{
      e.preventDefault();
      router.push({
        pathname: '/search/1',
        query: { search: sWord},
      })
      onClose();
  }
  return (
    <Box
      bg={useColorModeValue('white', 'teal.900')}
      borderLeft="1px"
      borderLeftColor={useColorModeValue('gray.200', 'gray.700')}
      top={1}
      w={{ base: "100%", md: "250px" }}
      my={{ base: 0, md: 3}}
      ml={{ base: 0, md: 3}}
      pos={{ base: 'initial', md: "sticky"}}
      h={{ base: "70vh", md: "100%"}}
      minH={{ base: "70vh", md: "100%"}}
      minW="0"
      {...rest}>
      <Flex h="10" display={{ base: 'flex', md: 'none' }} alignItems="center" mx="2" w={"100%"} justifyContent="space-between">
        <CloseButton onClick={onClose} />
      </Flex>
      <Box 
      className='navLinks' 
      shadow={{md:"md",base:"none"}}
      mb={2} mt={2} mx={2} p={"3px"} 
      border={{md:"1px solid gray.100",base:"0"}} borderRadius="5px"
      py="0.5rem">
        <Flex alignItems="center" mx="0" my="2" justifyContent="space-between">
          <InputGroup size='md'>
            <Input onChange={(e)=>{setSWord(e.target.value)}}
              pr='5rem'
              placeholder='Search'
            />
            <InputRightElement width='3rem'>
              <Button type="button" h='1.95rem' size='sm' onClick={onSerachSubmit}>
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
          <NavItem key={i} pl="2" icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}
        <Divider color={useColorModeValue('gray.200', 'gray.700')} mb={2} mt={2} />
        <Text px="3" py="1" color="gray.500">カテゴリ</Text>
        {CategoryItems.map((link,i) => (
          <NavItem icon={link.icon} key={i} link={link.link}>
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
//メニューのアイテム
const NavItem = ({ icon,link, children, ...rest }: NavItemProps) => {
  return (
    <NextLink href={link}>
        <Link  style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="2"
          mx="2"
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
              mr="2"
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
//モバイル用のナビゲーション(ヘッダー)
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
      justifyContent="space-between"
      {...rest}>
    <Box pl="2" pt="2">
      <NextLink href="/">
        <a>
        <Image src="/images/YakanBlogLogo-min.png"
            width={180}
            height={40}
            alt="ロゴ"
            />
        </a>
      </NextLink>
    </Box>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu color='white' />}
      />
    </Flex>
  );
};
