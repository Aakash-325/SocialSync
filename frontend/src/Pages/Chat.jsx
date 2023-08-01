import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Conversation from "../components/Chat Component/Conversation";
import Message from "../components/Chat Component/Message";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import API_ENDPOINT from "../config";
import { io } from "socket.io-client";
import { VscSend } from "react-icons/vsc";
import { FaFacebookMessenger } from "react-icons/fa";

const Messenger = () => {
  const bgColor = useColorModeValue("white", "#1A202C");
  const { user } = useContext(AuthContext);
  const inputBgColor = useColorModeValue("gray.200", "#413F42");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/conversation/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/message/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      message: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      message: newMessage,
    });

    try {
      const res = await axios.post(`${API_ENDPOINT}/api/message/add`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  console.log(messages);

  return (
    <>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Box flex="2.5">
          <Flex
            flexDirection="column"
            boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
            borderRadius="7px"
            backgroundColor="white"
            color="#000"
            bg={bgColor}
            position="relative"
            m="20px"
            pl="8px"
            pb="8px"
            height="72vh"
          >
            {conversations.map((c) => (
              <Box key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation key={c._id} conversation={c} currenuser={user} />
              </Box>
            ))}
          </Flex>
        </Box>
        <Box
          flex="5.5"
          boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
          borderRadius="7px"
          backgroundColor="white"
          color="#000"
          p={4}
          m="20px"
          h="100%"
          overflowY={scroll}
          bg={bgColor}
        >
          {currentChat ? (
            <>
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                pr="4"
                pl="2"
                py="4"
                height="72vh"
                overflowY="scroll"
              >
                <Text textAlign="center" mb="20px" fontWeight="bold">
                  Message
                </Text>
                {messages && messages.length > 0 ? (
                  <>
                    {messages.map((m) => (
                      <Box key={m._id} ref={scrollRef}>
                        <Message
                          key={m._id}
                          message={m}
                          own={m.sender !== user._id}
                        />
                      </Box>
                    ))}
                  </>
                ) : (
                  <>No Messages yet!</>
                )}
              </Flex>
              <Flex
                mt="5px"
                justifyContent="space-between"
                alignItems="center"
                gap="4"
              >
                <Input
                  flex="1"
                  h="40px"
                  p="10px"
                  bg={inputBgColor}
                  variant="filled"
                  border="none"
                  borderRadius="18px"
                  placeholder="Write something..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <IconButton
                  aria-label="Send Message"
                  icon={<VscSend />}
                  borderRadius="50px"
                  bg="#128C7E"
                  color="white"
                  _hover={{ color: "white" }}
                  onClick={handleSubmit}
                />
              </Flex>
            </>
          ) : (
            <Box h="85vh" fontSize="40px" color="gray.500" position="relative">
              <Flex
                flexDirection="column"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                alignItems="center"
                maxW={{ base: "100%", md: "80%" }}
              >
                <Box>
                  <FaFacebookMessenger size="4rem" color="teal" />
                </Box>
                <Box
                  as="p"
                  fontSize={{ base: "30px", md: "40px" }}
                  color="teal"
                >
                  Send Private Messages to your Friends
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Messenger;
