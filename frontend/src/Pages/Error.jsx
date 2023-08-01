import { Box, Flex, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { FcCheckmark } from "react-icons/fc";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#FAF3F0"
    >
      <Box
        maxW="600px"
        textAlign="center"
        bg="white"
        boxShadow="0px 5px 10px rgba(0,0,0,0.1)"
        p="8"
        rounded="md"
      >
        <Heading fontSize={["8xl", "10xl"]} mb="4" position="relative">
          404
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bgGradient="linear(to-b, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6)"
            bgClip="text"
            textFillColor="transparent"
            textShadow="1px 1px 2px rgba(255,255,255,0.25)"
            animation="animate 10s ease-in-out infinite"
            data-text="404"
          />
        </Heading>
        <Text
          fontSize={["2xl", "3xl"]}
          textTransform="uppercase"
          fontWeight="bold"
          mb="6"
          position="relative"
          _after={{
            content: "attr(data-text)",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            textShadow: "1px 1px 2px rgba(255,255,255,0.4)",
            bgClip: "text",
            textFillColor: "transparent",
          }}
          data-text="Opps! Page not found"
        >
          Opps! Page not found
        </Text>
        <Text fontSize={["md", "lg"]} color="gray.700">
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </Text>
        <Box mt="6">
          <Flex alignItems="center" justifyContent="center">
            <FcCheckmark size={24} />
            <Text ml="2">Page Not Found</Text>
          </Flex>
        </Box>
        <Flex justifyContent="center" mt="6">
          <ChakraLink
            as={Link}
            to="/"
            variant="link"
            border="2px solid"
            borderColor="teal.500"
            color="teal.500"
            fontWeight="semibold"
            rounded="full"
            px="6"
            py="3"
            mr="4"
            textTransform="uppercase"
            transition="all 0.3s ease"
            _hover={{ bg: "teal.500", color: "white" }}
          >
            Return Home
          </ChakraLink>
        </Flex>
      </Box>
    </Box>
  );
};

export default Error404;
