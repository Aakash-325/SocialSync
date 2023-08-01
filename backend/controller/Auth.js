import CryptoJS from "crypto-js";
import User from "../model/User";
import jwt from "jsonwebtoken";
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

export const register = async (req, res) => {
  const { username, email, password, contact } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already Exists! Login instead." });
  }

  // Upload the profile picture to Cloudinary and then delete the temporary file
  const result = await cloudinary.uploader.upload(req.file.path);
  fs.unlinkSync(req.file.path);

  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(password, process.env.Crypto_Key).toString(),
    contact: contact,
    profilePicture: result.secure_url,  // Save the Cloudinary URL of the uploaded picture
  });

  try {
    newUser.save();
    console.log(newUser)
  } catch (err) {
    console.log(err);
  }

  return res
    .status(201)
    .json({ message: "successfully saved in db.", newUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
    
    const decryptedPassword = CryptoJS.AES.decrypt(
      user?.password,
      process.env.Crypto_Key
    ).toString(CryptoJS.enc.Utf8);
    
    if (password !== decryptedPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
  
    return res.status(200).json({token, user});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "User Does not exist." });
  }
};
