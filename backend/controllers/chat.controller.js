import User from "../models/auth.models.js";
import Message from "../models/message.models.js";

export async function getContacts(req, res) {
  try {
    const contacts = await User.find({ _id: { $ne: req.userId } }).select(
      "name email",
    );
    // Return contacts with a default status; real-time online status is handled by socket
    const contactsWithStatus = contacts.map((c) => ({
      _id: c._id,
      name: c.name,
      email: c.email,
      status: "offline", // Default; frontend updates via socket events
    }));
    res.json(contactsWithStatus);
  } catch (error) {
    console.error("getContacts error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMessages(req, res) {
  const { contactId } = req.params;

  if (!contactId) {
    return res.status(400).json({ message: "contactId is required" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { from: req.userId, to: contactId },
        { from: contactId, to: req.userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("getMessages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function saveMessage(req, res) {
  const { to, text } = req.body;

  if (!to || !text) {
    return res.status(400).json({ message: "to and text are required" });
  }

  try {
    const newMessage = await Message.create({
      from: req.userId,
      to,
      text,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("saveMessage error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
