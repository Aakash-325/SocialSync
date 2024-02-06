import Conversation from "../model/Conversation";

export const AddConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const existingConversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  console.log(existingConversation)
  
  if (existingConversation) {
    return res.status(409).json({
      error: "Conversation already exists between these users.",
      existingConversationId: existingConversation._id,
    });
  }

  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
