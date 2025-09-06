import Chat from "../models/Chat.js";

// API controller for creating new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await Chat.create(chatData);
    res
      .status(201)
      .json({ success: true, message: "Chat created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API controller for fetching all chats of a user
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API controller for deleting a chat by ID
export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    const userId = req.user._id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    await Chat.deleteOne({ _id: chatId });
    res
      .status(200)
      .json({ success: true, message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
