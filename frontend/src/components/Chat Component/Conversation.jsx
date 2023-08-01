import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINT from "../../config";
import { chakra } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Conversation = (conversation) => {
  const [theuser, setTheUser] = useState(null);
  const { user } = useContext(AuthContext);
  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    const friendId = conversation?.conversation?.members?.find(
      (m) => m !== user._id
    );

    const getUser = async () => {
      try {
        if (friendId) {
          const res = await axios.get(
            `${API_ENDPOINT}/api/user/get/${friendId}`
          );
          setTheUser(res.data);
        } else {
          console.log("FriendId not Found !");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user, conversation]);

  return (
    <Flex alignItems="center" p="10px" cursor="pointer" mt="8px">
      {theuser && (
        <>
          <Image
            w="40px"
            h="40px"
            borderRadius="50%"
            objectFit="cover"
            mr="20px"
            src={
              theuser.profilePicture
                ? theuser.profilePicture
                : "https://www.gowpala.org/assets/uploads/testimonials/default.jpg"
            }
            alt="profilepicture"
          />
          <Flex flexDirection="column" >
            <Text color={textColor} fontSize="18px" >{theuser.username}</Text>
            <Text color={textColor} fontSize="12px">
              last seen recently
            </Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Conversation;
