import express from "express";
import {
  getContacts,
  getMessages,
  saveMessage,
} from "../controllers/chat.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/contacts", requireAuth, getContacts);
router.get("/messages/:contactId", requireAuth, getMessages);
router.post("/messages", requireAuth, saveMessage);

export default router;
