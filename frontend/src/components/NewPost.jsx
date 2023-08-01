import {
  Box,
  Input,
  InputGroup,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcPicture, FcLandscape, FcVoicePresentation } from "react-icons/fc";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API_ENDPOINT from "../config";

const NewPost = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const inputBgColor = useColorModeValue("gray.200", "#413F42");
  const lineColor = useColorModeValue("grey.400", "grey.800");
  const [imageFile, setImageFile] = useState(null);
  const { user, token } = useContext(AuthContext);

  const onImageChange = (event) => {
    console.log("Image is selected");
    setImageFile(event.target.files[0]);
    console.log("Image file state:", imageFile);
  };

  const newpost = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userId", user._id);
    formdata.append("desc", e.target.description?.value);
    formdata.append("profilePicture", user?.profilePicture);
    formdata.append("username", user?.username);
    formdata.append("file", imageFile);

    console.log("Form data:", formdata);

    try {
      console.log("axios now triggering...");
      const res = await axios.post(`${API_ENDPOINT}/api/post/add`, formdata, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response:", res);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <Box
      boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
      borderRadius="20px"
      backgroundColor="white"
      color="#000"
      marginBottom="20px"
      bg={bgColor}
    >
      <form onSubmit={newpost}>
        <Box p="20px">
          <Flex alignItems="center" gap="20px">
            <Image
              src={user?.profilePicture}
              alt="profilepic"
              w="50px"
              h="50px"
              borderRadius="50%"
              objectFit="cover"
            />
            <Input
              type="text"
              placeholder={`What's on your mind ${user?.username}?`}
              variant="filled"
              border="none"
              name="description"
              borderRadius="22px"
              p="20px 10px"
              w="60%"
              color="#000"
              size="lg"
              bg={inputBgColor}
              _dark={{
                _placeholder: { color: "grey" },
              }}
            />
          </Flex>
          <Box margin="20px 0" h="1px" bg={lineColor} />
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="20px">
              <InputGroup>
                <Input
                  type="file"
                  id="file"
                  display="none"
                  onChange={onImageChange}
                />
                <label htmlFor="file">
                  <Flex
                    alignItems="center"
                    gap="7px"
                    cursor="pointer"
                    fontSize="sm"
                    color="gray"
                  >
                    <FcPicture size={24} />
                    <Text display={{ base: "none", md: "unset" }}>Upload</Text>
                  </Flex>
                </label>
              </InputGroup>
              <InputGroup>
                <Input type="file" id="file" display="none" />
                <label htmlFor="file">
                  <Flex
                    alignItems="center"
                    gap="7px"
                    cursor="pointer"
                    fontSize="sm"
                    color="gray"
                  >
                    <FcLandscape size={24} />
                    <Text display={{ base: "none", md: "unset" }}>
                      Location
                    </Text>
                  </Flex>
                </label>
              </InputGroup>
              <InputGroup>
                <Input type="file" id="file" display="none" />
                <label htmlFor="file">
                  <Flex
                    alignItems="center"
                    gap="7px"
                    cursor="pointer"
                    fontSize="sm"
                    color="gray"
                  >
                    <FcVoicePresentation size={24} />
                    <Text display={{ base: "none", md: "unset" }}>Tag</Text>
                  </Flex>
                </label>
              </InputGroup>
            </Flex>
            <Box>
              <Button
                type="submit"
                border="none"
                p="10px 17px"
                color="white"
                cursor="pointer"
                bg="teal" 
                borderRadius="22px"
                _hover={{ bg: '#22A699' }}
              >
                POST
              </Button>
            </Box>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default NewPost;
