/* eslint-disable react/prop-types */
import { Box, Flex, Avatar, Input, Button, Image } from "@chakra-ui/react";
import axios from "axios";
import API_ENDPOINT from "../config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/api/post/comments/${post._id}`
        );
        if (response.status === 200) {
          setComments(response?.data.comments);
          console.log(response.data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [post]);

  const handleComment = async () => {
    try {
      await axios.post(`${API_ENDPOINT}/api/post/comment/${post._id}`, {
        user: user,
        comment: commentValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="comments">
      <Flex className="write" alignItems="center">
        <Image
          w="40px"
          h="40px"
          borderRadius="50%"
          src={user.profilePicture}
          alt=""
          mr={2}
        />
        <Input
          type="text"
          placeholder="Write a comment"
          name="comment"
          flex="1"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />

        <Button colorScheme="teal" ml={2} onClick={handleComment}>
          Send
        </Button>
      </Flex>

      {comments.length === 0 ? (
        <Box mt={4} color="gray.500">
          Be the first one to comment
        </Box>
      ) : (
        comments.map((comment, index) => (
          <Flex
            className="comment"
            alignItems="center"
            key={index}
            mt={4}
            gap={4}
          >
            <Image
              w="40px"
              h="40px"
              borderRadius="50%"
              src={comment && comment?.user?.profilePicture}
              alt=""
              mr={2}
            />
            <Box>
              <Box as="span" fontSize="14px" fontWeight="bold" mr={1}>
                {comment && comment?.user?.username}
              </Box>
              <Box as="p" mb={1} fontSize="14px" >
                {comment?.comment}
              </Box>
            </Box>
          </Flex>
        ))
      )}
    </Box>
  );
};

export default Comments;
