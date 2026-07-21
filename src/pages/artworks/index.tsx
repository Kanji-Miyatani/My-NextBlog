import { NextPage } from "next";
import Layout from "../../../components/Layout";
import Seo from "../../../components/Seo";
import { CreateBreadCrumbdata } from "../../../lib/dataConvert";
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Link,
  Flex,
  Icon,
  UnorderedList,
  ListItem,
  Tag,
} from "@chakra-ui/react";
import { FiExternalLink, FiGlobe, FiCpu, FiInfo } from "react-icons/fi";
import { IconType } from "react-icons";

interface WorkItem {
  name: string;
  url: string;
}

interface WorkSection {
  title: string;
  icon: IconType;
  items: WorkItem[];
}

//掲載している作品一覧
const workSections: WorkSection[] = [
  {
    title: "ホームページ",
    icon: FiGlobe,
    items: [
      { name: "おん祭美濃加茂", url: "https://www.onsai-minokamo.com/" },
      { name: "カツヒロ建築", url: "https://www.katsuken-kamono.com/" },
      { name: "アルバークス", url: "https://www.2win-street.com/" },
      { name: "プルプルホルモン", url: "https://www.purupuru-horumon.com/" },
    ],
  },
  {
    title: "システム",
    icon: FiCpu,
    items: [
      { name: "美濃加茂仕事ナビ", url: "https://minokamo-job-navi.up.railway.app" },
    ],
  },
];

//掲載方針
const policies: string[] = [
  "1人で設計・開発し、かつ実際に運用されている作品のみ掲載しています。",
  "AIに書かせて自分で一つもコードを書いていない作品は掲載していません。",
  "業務上の都合や、掲載の許可が得られなかった作品は掲載していません。",
];

const WorkCard = ({ item }: { item: WorkItem }) => {
  return (
    <Link
      href={item.url}
      isExternal
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Box
        p={4}
        h="100%"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        shadow="sm"
        transition="all 0.2s"
        _hover={{ shadow: "md", borderColor: "teal.400", transform: "translateY(-2px)" }}
      >
        <Flex align="center" justify="space-between">
          <Heading as="h3" size="sm">
            {item.name}
          </Heading>
          <Icon as={FiExternalLink} color="teal.400" />
        </Flex>
        <Text mt={2} fontSize="xs" color="gray.500" wordBreak="break-all">
          {item.url}
        </Text>
      </Box>
    </Link>
  );
};

const Artworks: NextPage = () => {
  return (
    <Layout breadCrumbData={CreateBreadCrumbdata("作品一覧", "artworks")}>
      <Seo
        title={"作品"}
        isHome={false}
        imageUrl={""}
        description={"やかんの作品集。1人で設計・開発し、実際に運用されているホームページ・システムを掲載しています。"}
        path={"artworks"}
      />
      <Box p={{ base: 4, md: 2 }}>
        <Heading as="h1" size="lg" mb={2}>
          作品一覧
        </Heading>
        <Text color="gray.600" mb={6}>
          これまでに制作したホームページ・システムの一覧です。
        </Text>

        {/* 掲載方針 */}
        <Box
          mb={8}
          p={4}
          bg="teal.50"
          borderLeft="4px solid"
          borderLeftColor="teal.400"
          borderRadius="md"
        >
          <Flex align="center" mb={2}>
            <Icon as={FiInfo} color="teal.500" mr={2} />
            <Heading as="h2" size="sm">
              掲載方針
            </Heading>
          </Flex>
          <UnorderedList spacing={1} pl={2} fontSize="sm" color="gray.700">
            {policies.map((policy, i) => (
              <ListItem key={i}>{policy}</ListItem>
            ))}
          </UnorderedList>
        </Box>

        {/* 作品セクション */}
        {workSections.map((section, i) => (
          <Box key={i} mb={10}>
            <Flex align="center" mb={4}>
              <Icon as={section.icon} color="teal.400" mr={2} fontSize="xl" />
              <Heading as="h2" size="md">
                {section.title}
              </Heading>
              <Tag ml={3} size="sm" colorScheme="teal" variant="subtle">
                {section.items.length}件
              </Tag>
            </Flex>
            <Grid
              templateColumns={{
                lg: "repeat(2, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              gap={4}
            >
              {section.items.map((item, j) => (
                <GridItem key={j}>
                  <WorkCard item={item} />
                </GridItem>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default Artworks;
