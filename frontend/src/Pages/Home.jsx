import Posts from "../components/Posts";
import NewPost from "../components/NewPost";
import RightBar from "../components/RightBar";
import { Box, Flex } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Box as="main" p="4">
      <Flex direction={{ base: "column", md: "row" }} gap="10">
        <Box flex={{ base: "100%", md: "65%" }}>
          <NewPost />
          <Posts />
        </Box>
        <Box
          flex={{ base: "100%", md: "35%" }}
          display={{ base: "none", md: "unset" }}
        >
          <RightBar />
        </Box>
      </Flex>
    </Box>
  );
};
