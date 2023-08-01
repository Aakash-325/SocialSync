import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputGroup,
  Box,
  Stack,
  Text,
  Flex,
  Select,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import { FcLock } from "react-icons/fc";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import API_ENDPOINT from "../config";

const countryOptions = [
  { value: "+1", label: "+1  United States" },
  { value: "+86", label: "+86  China" },
  { value: "+91", label: "+91  India" },
  { value: "+7", label: "+7  Russia" },
  { value: "+81", label: "+81  Japan" },
  { value: "+44", label: "+44  United Kingdom" },
  { value: "+49", label: "+49  Germany" },
  { value: "+33", label: "+33  France" },
  { value: "+39", label: "+39  Italy" },
  { value: "+61", label: "+61  Australia" },
  { value: "+82", label: "+82  South Korea" },
  { value: "+971", label: "+971  United Arab Emirates" },
  { value: "+358", label: "+358  Finland" },
  { value: "+34", label: "+34  Spain" },
];

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setisRegister] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const toast = useToast();

  const onImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("username", event.target.username?.value);
    formData.append("email", event.target.email?.value);
    formData.append("countryCode", countryCode);
    formData.append("contact", phoneNumber);
    formData.append("password", event.target.password?.value);

    if (isRegister) {
      formData.append("file", imageFile);
      console.log(formData);
      axios
        .post(`${API_ENDPOINT}/api/auth/register`, formData)
        .then((response) => {
          if (response.status === 201) {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            window.location.reload(true);
          }
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      const data = {
        email: event.target.email?.value,
        password: event.target.password?.value,
      };
      console.log(data);
      axios
        .post(`${API_ENDPOINT}/api/auth/login`, data)
        .then((response) => {
          if (response.status === 200) {
            toast({
              title: "login successful",
              description: "you have successfully Logged In",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            console.log(response.data);
            localStorage.setItem("auth", JSON.stringify(response.data));
            window.location.href = "/";
          }
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.response?.data?.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };

  function handleCountryCodeChange(event) {
    setCountryCode(event.target.value);
  }

  function handlePhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
  }

  return (
    <Grid h="100vh" placeItems="center">
      <Box display="flex" w={{ base: "unset", md: "60%" }} p="1rem" h="600px">
        <Box
          id="background"
          display={{ base: "none", md: "unset" }}
          w="50%"
          position="relative"
          textDecoration="none"
        >
          <Image
            src="https://aprendehablando.com/wp-content/uploads/2019/01/learn-conversational-spanish-fast-1.jpg"
            alt="Background"
            objectFit="cover"
            h="full"
            w="full"
            borderLeftRadius="10px"
            style={{
              filter: "brightness(0.5) contrast(1.2)",
              zIndex: -1,
            }}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            width="100%"
          >
            <Text
              as="h1"
              fontSize={["32px", "40px", "48px"]}
              color="white"
              mb="4"
              textAlign="center"
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
            >
              Social Sync
            </Text>

            <Text
              fontSize={{ base: "16px", sm: "12px", md: "14px" }}
              color="white"
              m="20px"
            >
              Social Sync revolutionizes social media management by offering
              speed and efficiency. It creates an engaging, fun experience,
              enabling users to connect better and enjoy their social media
              content. This tool simplifies social media management, focusing on
              enhancing relationships and enjoyment in the social media
              landscape.
            </Text>
            <Box>
              <Text color="white">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>
              <Button
                type="submit"
                bg="#25c19b"
                mt="1rem"
                fontSize="md"
                fontWeight="normal"
                w="34%"
                onClick={() => setisRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box id="form" flexGrow={1}>
          <Box
            p={8}
            borderRightRadius="10px"
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
            backgroundColor="whiteAlpha.400"
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Button
              display={{ base: "unset", md: "none" }}
              type="submit"
              bg="#25c19b"
              mt="1rem"
              fontSize="md"
              fontWeight="normal"
              w="34%"
              position="absolute"
              top="7%"
              right="35%"
              borderRadius="40px"
              onClick={() => setisRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </Button>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mb={4}
                >
                  <FcLock size={48} />
                  <Text variant="h4">{isRegister ? "Register" : "Login"}</Text>
                </Flex>
                {isRegister && (
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement>
                        <FaUserAlt />
                      </InputLeftElement>
                      <Input
                        variant="filled"
                        placeholder="Name"
                        name="username"
                        focusBorderColor="#25c19b"
                        required
                      />
                    </InputGroup>
                  </FormControl>
                )}
                <FormControl>
                  <InputGroup>
                    <InputLeftElement>
                      <FaEnvelope />
                    </InputLeftElement>
                    <Input
                      variant="filled"
                      placeholder="Enter Email"
                      type="email"
                      name="email"
                      focusBorderColor="#25c19b"
                      required
                    />
                  </InputGroup>
                </FormControl>
                {isRegister && (
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement>
                        <FaImage />
                      </InputLeftElement>
                      <Input
                        variant="filled"
                        placeholder="Upload Image"
                        type="file"
                        onChange={onImageChange}
                        name="image"
                        focusBorderColor="#25c19b"
                        required
                      />
                    </InputGroup>
                  </FormControl>
                )}
                {isRegister && (
                  <FormControl>
                    <InputGroup gap="4">
                      <Select
                        id="countrycode"
                        value={countryCode}
                        variant="filled"
                        onChange={handleCountryCodeChange}
                        maxWidth="120px"
                        color="gray.600"
                        focusBorderColor="#25c19b"
                      >
                        {countryOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={{ color: option.color }}
                          >
                            {option.label}
                          </option>
                        ))}
                      </Select>
                      <InputGroup>
                        <InputLeftElement>
                          <IoCall />
                        </InputLeftElement>
                        <Input
                          type="tel"
                          required
                          variant="filled"
                          name="contact"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          placeholder="Enter phone number"
                          color="gray.600"
                          focusBorderColor="#25c19b"
                        />
                      </InputGroup>
                    </InputGroup>
                  </FormControl>
                )}

                <FormControl>
                  <InputGroup>
                    <Input
                      variant="filled"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      name="password"
                      focusBorderColor="#25c19b"
                      required
                    />
                    <InputLeftElement>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FaLock />
                      </Button>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
                <Button
                  type="submit"
                  bg="#25c19b"
                  size="lg"
                  fontSize="md"
                  fontWeight="normal"
                  maxW="full"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Auth;
