import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINT from "../config";
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoPersonAddOutline } from "react-icons/io5";
import { BsEmojiFrown } from "react-icons/bs";

const Search = () => {
  const { query } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const bgColor = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/user/getalluser`);
        const data = response.data;
        if (query) {
          setFilteredData(
            data.filter((item) => {
              return item.username.toLowerCase().includes(query);
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [query]);

  return (
    <Box as="main" p="4">
      <Flex direction={{ base: "column", md: "row" }} gap="10">
        <Box flex={{ base: "100%", md: "65%" }}>
          <Box
            boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
            borderRadius="10px"
            backgroundColor="white"
            color="#000"
            px={4}
            py={2}
            bg={bgColor}
          >
            {filteredData.length === 0 ? (
              <Box
                flexDirection="column"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="86vh"
              >
                <BsEmojiFrown size="4rem" color="teal" />
                <Text
                  textAlign="center"
                  fontSize="16px"
                  color={textColor}
                  my="1rem"
                >
                  No User found with this name
                </Text>
              </Box>
            ) : (
              filteredData.map((user) => (
                <Flex
                  key={user.id}
                  align="center"
                  justify="space-between"
                  mb="4"
                >
                  <Flex align="center" gap={4}>
                    <Image
                      src={user.profilePicture}
                      alt="profilepic"
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                      objectFit="cover"
                    />
                    <Flex flexDirection="column">
                      <Text color={textColor} fontWeight="500">
                        {user.username}
                      </Text>
                      <Text color={textColor} fontSize="14px">
                        1 min ago
                      </Text>
                    </Flex>
                  </Flex>
                  <IoPersonAddOutline style={{ fontSize: "20px" }} />
                </Flex>
              ))
            )}
          </Box>
        </Box>
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
            maxWidth="400px"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
                fontSize="14px"
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
                maxH="250px" // Adjust the max height as per your design
                objectFit="cover"
                marginTop="20px"
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
      </Flex>
    </Box>
  );
};

export default Search;
