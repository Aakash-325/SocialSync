import Post from "../model/Post";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  const { userId, desc, profilePicture, username } = req.body;
  console.log(profilePicture);

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);
    const post = new Post({
      userId: userId,
      desc: desc,
      img: result.secure_url,
      profilePicture: profilePicture,
      username: username,
    });
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("Post ID:", postId);

    const post = await Post.findById(postId);
    console.log("Retrieved Post:", post);

    if (post.userId == req.body.userId) {
      await Post.findByIdAndUpdate(postId, req.body);
      console.log("Updated Post:", req.body);
      res.status(200).json("Post is successfully updated!");
    } else {
      res.status(403).json({ error: "You can edit only your post!" });
    }
  } catch (err) {
    console.error("Error in updatePost:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await Post.deleteOne({ _id: req.params.id });
      res.status(200).json("Post is successfully deleted!");
    } else {
      res.status(403).json({ error: "You can delete only your post!" });
    }
  } catch (err) {
    console.error("Error in deletePost:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postReaction = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
      await post.save();
      res.status(200).json("Post has been liked!");
    } else {
      post.likes.pull(req.body.userId);
      await post.save();
      res.status(200).json("Post has been disliked!");
    }
  } catch (err) {
    console.error("Error in postReaction:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postComment = async (req, res) => {
  try {
    const { user, comment } = req.body;

    await Post.updateOne(
      { _id: req.params.id },
      { $push: { comments: { user, comment } } }
    );

    res.status(200).json("Comment has been added to post!");
  } catch (err) {
    console.error("Error in postComment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const postComments = await Post.findById(req.params.id);

    if (!postComments || postComments.length === 0) {
      res.status(200).json({ message: "Be the first one to comment" });
    } else {
      res.status(200).json(postComments);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
