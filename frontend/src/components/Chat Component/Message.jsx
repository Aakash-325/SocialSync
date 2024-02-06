/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  const textColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("#EEEEEE", "#006AFF");
  const borderRadius = own ? "20px 20px 0 20px" : "20px 20px 20px 0";
  const bubbleColor = own ? "#16C79A" : bgColor;
  const bubbleAlign = own ? "flex-end" : "flex-start";
  console.log(message)

  return (
    <Flex w="100%" justify={bubbleAlign} mb="10px">
      <Box>
        <Flex align="center" gap="4">
          <Image
            src="https://miro.medium.com/v2/resize:fit:2400/2*Wvta-LVQiGgrlp9N5z5AjA.jpeg"
            alt="profilepic"
            w="40px"
            h="40px"
            borderRadius="full"
            objectFit="cover"
          />
          <Flex flexDirection="column">
            <Text
              color={textColor}
              fontWeight="400"
              px="12px"
              py="8px"
              borderRadius={borderRadius}
              bg={bubbleColor}
              maxW="300px"
            >
              {message.message}
            </Text>
            <Text color={textColor} fontSize="xs" mt="2" alignSelf={own ? "flex-end" : "flex-start"}>
              {format(message.createdAt)}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Message;
