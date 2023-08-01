import { useEffect, useState } from "react";
import Post from "./Post";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import API_ENDPOINT from "../config";

const Posts = () => {
  const [postData, setPostData] = useState([]);

  const AllPosts = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/api/post/allpost`);
      const data = res.data;
      setPostData(data);
    } catch (err) {
      console.log(err);
    }
  }; 

  useEffect(() => {
    AllPosts();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      {postData.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </Box>
  );
};

export default Posts;
