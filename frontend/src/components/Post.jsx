/* eslint-disable react/prop-types */

import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import axios from "axios";
import API_ENDPOINT from "../config";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Comments from "./Comments";
import { BsChatRightText, BsShare } from "react-icons/bs";
import { format } from "timeago.js";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(post.likes.includes(post.userId));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const bgColor = useColorModeValue("white", "#1A202C");
  const textColor = useColorModeValue("black", "white");
  const iconColor = useColorModeValue("gray.700", "gray.500");
  const { user } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);

  console.log(post);

  const handleLike = async () => {
    try {
      await axios.put(`${API_ENDPOINT}/api/post/reaction/${post._id}`, {
        userId: user._id,
      });
      console.log(post._id);
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      console.log(`Post with id ${post._id} has been liked.`);
    } catch (err) {
      console.error("Error in handleLike:", err);
    }
  };

  const handleFriend = async () => {
    console.log(post?.userId, user?._id);
    try {
      await axios.put(
        `${API_ENDPOINT}/api/user/friend/${user._id}/${post?.userId}`
      );
      console.log("Successfull");

      const conversationData = {
        senderId: user._id,
        receiverId: post?.userId,
      };
      await axios.post(`${API_ENDPOINT}/api/conversation/add`,
        conversationData
      );
      console.log("Conversation created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      boxShadow="0px 0px 25px -10px rgba(0, 0, 0, 0.38)"
      borderRadius="20px"
      backgroundColor="white"
      color="#000"
      p={4}
      bg={bgColor}
    >
      <Box p={{ base: 0, md: "20px" }}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={4}>
            <Image
              src={post.profilePicture}
              alt="profilepic"
              width="40px"
              height="40px"
              borderRadius="50%"
              objectFit="cover"
            />
            <Flex flexDirection="column">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Text color={textColor} fontWeight="500">
                  {post.username}
                </Text>
              </Link>
              <Text color={textColor} fontSize="12px">
                Posted {format(post?.createdAt)}
              </Text>
            </Flex>
          </Flex>
          <Box color={iconColor}>
            <button onClick={handleFriend}>
              <IoPersonAddOutline style={{ fontSize: "20px" }} />
            </button>
          </Box>
        </Flex>
        <Box margin="20px 0px">
          <Text color={textColor}>{post.desc}</Text>
          <Image
            src={post.img}
            alt="post"
            width="100%"
            maxH="500px"
            objectFit="cover"
            marginTop="20px"
            borderRadius="10px"
          />
        </Box>
        <Flex align="center" gap="20px">
          <Flex alignItems="center" gap="10px" cursor="pointer" fontSize="14px">
            <Box as="span" mr={1}>
              {liked ? (
                <button onClick={handleLike}>
                  <FcLike style={{ fontSize: "20px" }} />
                </button>
              ) : (
                <button onClick={handleLike}>
                  <FcLikePlaceholder style={{ fontSize: "20px" }} />
                </button>
              )}
            </Box>
            <Text color={textColor} as="span">
              {likeCount} Likes
            </Text>
          </Flex>

          <Flex alignItems="center" gap="10px" fontSize="14px">
            <Box as="span" mr={1} color={iconColor}>
              <button>
                <BsChatRightText onClick={() => setCommentOpen(!commentOpen)} />
              </button>
            </Box>
            <Text color={textColor} as="span">
              Comments
            </Text>
          </Flex>

          <Flex alignItems="center" gap="10px" fontSize="14px">
            <Box as="span" mr={1} color={iconColor}>
              <BsShare />
            </Box>
            <Text color={textColor} as="span">
              Share
            </Text>
          </Flex>
        </Flex>
        {commentOpen && <Comments post={post} />}
      </Box>
    </Box>
  );
};

export default Post;
