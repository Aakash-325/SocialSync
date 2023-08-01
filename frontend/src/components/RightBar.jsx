import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsChatSquareText } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINT from "../config";


const RightBar = () => {
  const bgColor = useColorModeValue("white", "#1A202C");
  const textColor = useColorModeValue("black", "white");
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const iconColor = useColorModeValue("gray.700", "gray.500");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/api/user/get/${user._id}`
        );
        setFriends(response.data.friends);
        console.log(response.data.friends);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [user._id]);

  return (
    <Box>
      <Box
          flex={{ base: "100%", md: "35%" }}
          display={{ base: "none", md: "unset" }}
        >
          <Box
            boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
            borderRadius="10px"
            backgroundColor="white"
            color="#000"
            px={4}
            py={2}
            bg={bgColor}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                fontWeight="700"
                fontFamily="Arial, sans-serif"
                
                color={textColor}
              >
                Sponsored
              </Text>
              <Text
                color={"grey"}
                fontFamily="Arial, sans-serif"
                fontSize="12px"
              >
                Ad
              </Text>
            </Flex>
            <Link href="https://baccabucci.com/" target="_blank">
              <Image
                src="https://i2.wp.com/thewelldressedlife.com/wp-content/uploads/2019/05/WhiteSneakers.jpg"
                alt="ad"
                width="100%"
                maxH="270px"
                objectFit="cover"
                marginTop="8px"
                borderRadius="10px"
              />
            </Link>
            <Text
              fontSize="14px"
              color="grey"
              fontFamily="Arial, sans-serif"
              mt="10px"
              textAlign="center"
            >
              40% OFF - Get Sneakers at the Lowest Price and High Quality Brand
            </Text>
          </Box>
        </Box>
      <Box
        boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
        borderRadius="7px"
        backgroundColor="white"
        color="#000"
        p={4}
        mt="4"
        bg={bgColor}
      >
        <Text color={textColor} fontWeight="500" mb="4">
          Friends List
        </Text>
        {friends.map((friend) => (
          <Flex
            key={friend.id}
            align="center"
            gap={4}
            mb="4"
            justifyContent="space-between"
          >
            <Flex flexDirection="row" gap={4}>
              <Box>
                <Image
                  src={friend.profilePicture}
                  alt="profilepic"
                  width="50px"
                  height="50px"
                  borderRadius="50%"
                  objectFit="cover"
                />
              </Box>
              <Box>
                {/* <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              </Link> */}
                <Text color={textColor} fontWeight="500">
                  {friend.username}
                </Text>
                <Text color={textColor} fontSize="14px">
                  1 week ago
                </Text>
              </Box>
            </Flex>

            <Box color={iconColor} px="10px">
            <Link href="/chat" >
            <button >
                <BsChatSquareText style={{ fontSize: "20px" }} />
              </button>
            </Link>
             
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default RightBar;
