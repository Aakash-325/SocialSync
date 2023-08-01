import {
  Box,
  Flex,
  Image,
  Icon,
  useColorModeValue,
  Text,
  IconButton,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import { BsFillFilePersonFill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Profile = () => {
  const bgColor = useColorModeValue("white", "#1A202C");
  const profileColor = useColorModeValue("white", "#323232");
  const textColor = useColorModeValue("grey.600", "white");
  const iconColor = useColorModeValue("gray.600", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lineColor = useColorModeValue("grey.400", "grey.800");
  const [imageFile, setImageFile] = useState(null);
  const user = useContext(AuthContext);

  const onImageChange = (event) => {
    console.log("Image is selected");
    setImageFile(event.target.files[0]);
    console.log("Image file state:", imageFile);
  };

  return (
    <Box
      boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
      borderRadius="7px"
      backgroundColor="white"
      color="#000"
      p={4}
      m={4}
      bg={bgColor}
    >
      <Box w="100%" h={{base:"170px", md: "300px"}} position="relative">
        <Image
          src={
            user.user.coverPicture
              ? user.user.coverPicture
              : "https://prepperstrong.com/wp-content/uploads/placeholder.png"
          }
          alt="coverPicture"
          w="100%"
          h="100%"
          borderRadius="10px"
          objectFit="cover"
        />
        <Image
          src={user.user.profilePicture}
          alt="profilepicture"
          w={{base: "80px", md: "200px"}}
          h={{base: "80px", md: "200px"}}
          border={{base:"4px solid white", md:"7px solid white"}}
          borderRadius="50%"
          objectFit="cover"
          position="absolute"
          left="0"
          right="0"
          m="auto"
          top={{base:"130px", md:"180px"}}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            bgcolor: profileColor,
          }}
          onClick={onOpen}
        >
          <Icon as={GoPencil} fontSize="2xl" color={iconColor} />
        </IconButton>
      </Box>
      <Flex
        flex="2"
        flexDirection="column"
        my={{ base: "4rem", md: "1rem" }}
        mx="1rem"
        p="1rem"
        borderRadius="md"
        s
        bg={profileColor}
      >
        <Text fontSize="xl" fontWeight="bold" color={textColor} mb="4">
          {user.user.username}
        </Text>
        <Flex alignItems="center" color={textColor} mb="0.5rem">
          <Icon as={FaLocationDot} mr="0.5rem" boxSize="22px" />
          <Text fontSize="md">India, Mumbai</Text>
        </Flex>
        <Flex alignItems="center" color={textColor} mb="0.5rem">
          <Icon as={FaGraduationCap} mr="0.5rem" boxSize="22px" />
          <Text fontSize="md">Student</Text>
        </Flex>
        <Flex alignItems="center" color={textColor} mb="0.5rem">
          <Icon as={FaCalendarDays} mr="0.5rem" boxSize="22px" />
          <Text fontSize="md">XX</Text>
        </Flex>
        <Flex alignItems="center" color={textColor} mb="0.5rem">
          <Icon as={BsFillFilePersonFill} mr="0.5rem" boxSize="22px" />
          <Text fontSize="md" color={textColor}>
            &quot;Hey there! and Im XX years old. Im currently pursuing my dream
            to become a XYZ&quot;
          </Text>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader fontSize="16px" fontWeight="400">
            Change Cover Picture
          </ModalHeader>
          <Box h="1px" bg={lineColor} />
          <ModalCloseButton />
          <ModalBody>
            <Flex minH="60vh" flexDirection="column" justifyContent="center">
              <Box display="flex" justifyContent="center">
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  color={iconColor}
                  fill="rgb(245, 245, 245)"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96"
                >
                  <title>
                    Icon to represent media such as images or videos
                  </title>
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Box>
              <form >
                {!imageFile ? (
                  <Flex flexDirection="column" alignItems="center" gap="4">
                    <Text textAlign="center">Upload Image here</Text>
                    <Stack direction="row" spacing={4} align="center">
                      <Input
                        type="file"
                        display="none"
                        id="file-input"
                        onChange={onImageChange}
                      />
                      <label htmlFor="file-input">
                        <Button as="span" colorScheme="teal">
                          Select from computer
                        </Button>
                      </label>
                    </Stack>
                  </Flex>
                ) : (
                  <Box>
                    <Button
                      type="submit"
                      border="none"
                      p="10px 17px"
                      color="white"
                      cursor="pointer"
                      bg="teal"
                      _hover={{ bg: "#22A699" }}
                    >
                      POST
                    </Button>
                  </Box>
                )}
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
