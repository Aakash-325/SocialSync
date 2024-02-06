/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Stack,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import { FcHome, FcSearch, FcSms, FcGallery } from "react-icons/fc";
import { BsPlusCircle } from "react-icons/bs";
import { CiMail, CiUser } from "react-icons/ci";
import { Switch } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Helmet } from "react-helmet";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import API_ENDPOINT from "../config";
import axios from "axios";

export const Sidebar = () => {
  const sidebar = useDisclosure();
  const lineColor = useColorModeValue("grey.400", "grey.800");
  const color = useColorModeValue("gray.600", "gray.300");
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const { user, logout, token } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);
  const iconColor = useColorModeValue("#1b1b1b", "white");
  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
  } = useDisclosure();

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

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: "gray.400" }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.900" },
          color: "gray.900",
        }}
        role="group"
        transition=".15s ease"
        fontFamily="poppins"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Text
          fontSize="40px"
          fontWeight="bold"
          color="teal"
          style={{ fontFamily: "Kaushan Script, sans-serif" }}
        >
          Social Sync
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize={{ base: 14, md: 16 }}
        aria-label="Main Navigation"
      >
        <LinkBox>
          <NavItem>
            <LinkOverlay
              href="/"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon
                as={FcHome}
                color="#FF7F00"
                boxSize={8}
                p={1}
                style={{ marginRight: "0.5rem" }}
              />
              Home
            </LinkOverlay>
          </NavItem>
        </LinkBox>
        <LinkBox>
          <NavItem onClick={onOpen}>
            <Icon
              as={FcSearch}
              color="#FF7F00"
              boxSize={8}
              p={1}
              style={{ marginRight: "0.5rem" }}
            />
            Search
          </NavItem>
        </LinkBox>
        <LinkBox>
          <NavItem>
            <LinkOverlay
              href="/chat"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon
                as={FcSms}
                color="#FF7F00"
                boxSize={8}
                p={1}
                style={{ marginRight: "0.5rem" }}
              />
              Chat
            </LinkOverlay>
          </NavItem>
        </LinkBox>
        <LinkBox>
          <NavItem>
            <LinkOverlay
              href="profile"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon
                as={FaUserCircle}
                color="#FF7F00"
                boxSize={8}
                p={1}
                style={{ marginRight: "0.5rem" }}
              />
              Profile
            </LinkOverlay>
          </NavItem>
        </LinkBox>
        <NavItem onClick={onUploadOpen}>
          <Icon
            as={FcGallery}
            color="#FF7F00"
            boxSize={8}
            p={1}
            style={{ marginRight: "0.5rem" }}
          />
          Add Post
          <Icon ml="20" as={BsPlusCircle} fontSize="md" color="gray.800" />
        </NavItem>

        <NavItem position="fixed" bottom="4" left="2" onClick={logout}>
          <Text fontSize={{ base: 16, md: 18 }}>Logout</Text>
          <Icon ml="24" boxSize={6} color="red" as={IoLogOutOutline} />
        </NavItem>
      </Flex>
    </Box>
  );

  return (
    <Box as="section" bg="grey.200" _dark={{ bg: "grey.900" }} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="45%" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <SearchBar width="96" size="md" display={{ base: 'none', md: 'flex' }} />
          <Flex align="center">
            <Stack align="center" direction="row">
              <Switch
                size="md"
                colorScheme="teal"
                isChecked={text === "dark"}
                onChange={toggleMode}
                aria-label={`Switch to ${text} mode`}
              />
            </Stack>
            <Link to="/profile">
              <IconButton
                size="md"
                fontSize="2xl"
                fontWeight="bold"
                aria-label="Toggle Notifications"
                variant="ghost"
                color="current"
                ml={{
                  base: "0",
                  md: "3",
                }}
                icon={<Icon as={CiUser} />}
              />
            </Link>
            <Link to="/chat">
              <IconButton
                size="md"
                fontSize="2xl"
                fontWeight="bold"
                aria-label="Toggle Notifications"
                variant="ghost"
                color="current"
                ml={{
                  base: "0",
                  md: "3",
                }}
                icon={<Icon as={CiMail} />}
              />
            </Link>
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src={user?.profilePicture}
              cursor="pointer"
            />
          </Flex>
        </Flex>
        <Outlet />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="none" boxShadow="none">
          <ModalBody background="none">
            <SearchBar size="lg" width="66" display='flex' />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUploadOpen} onClose={onUploadClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader fontSize="16px" fontWeight="400" >Create new post </ModalHeader>
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
              <form onSubmit={newpost}>
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
                  <Box display="flex" flexDirection="column" gap="4" mt="28">
                    <Textarea
                      placeholder="write a caption .."
                      border="1px solid grey"
                      name="description"
                      focusBorderColor="teal"
                    />
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
