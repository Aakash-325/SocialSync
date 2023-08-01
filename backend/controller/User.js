import User from "../model/User";

export const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: { coverPicture: req.body.coverPicture },
      }, { new: true });

      res.status(200).json("Cover picture has been updated!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    return res.status(500).json("Error while updating Cover Picture!");
  }
};

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.body.userId);
      if (user) {
        res.status(200).json("Account has been deleted!");
      } else {
        res.status(404).json("User not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("An error occurred while deleting the account.");
    }
  } else {
    res.status(403).json("You can only delete your own account!");
  }
};
 
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occurred while fetching the user.");
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("No user Found.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occurred while fetching the users.");
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Check if the friendId is the same as the user's id
    if (id === friendId) {
      return res
        .status(400)
        .json({ message: "Cannot add yourself as a friend" });
    }
    const isFriend = user.friends.some(friendObj => friendObj.id === friendId);

    if (isFriend) {
      user.friends = user.friends.filter(friendObj => friendObj.id !== friendId);
      friend.friends = friend.friends.filter(friendObj => friendObj.id !== id);
    } else {
      user.friends.push({ id: friendId, username: friend.username, profilePicture: friend.profilePicture });
      friend.friends.push({ id: id, username: user.username, profilePicture: user.profilePicture });
    }

    await user.save();
    await friend.save();

    res.status(200).json("Successfull");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

