import {
  Box,
  Flex,
  Image,
  Icon,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import { BsFillFilePersonFill } from "react-icons/bs";

const Profile = () => {
  const bgColor = useColorModeValue("white", "#1A202C");
  const profileColor = useColorModeValue("white", "#323232");
  const textColor = useColorModeValue("grey.600", "white");
  const user = useContext(AuthContext);

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
          <Text fontSize="md">xx - xx - xx</Text>
        </Flex>
        <Flex alignItems="center" color={textColor} mb="0.5rem">
          <Icon as={BsFillFilePersonFill} mr="0.5rem" boxSize="22px" />
          <Text fontSize="md" color={textColor}>
            &quot;Hey there! and Im XX years old. Im currently pursuing my dream
            to become a XYZ&quot;
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;
