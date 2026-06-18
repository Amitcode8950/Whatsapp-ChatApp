import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dns from "node:dns";
import User from "./models/auth.models.js";
import Message from "./models/message.models.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

async function resetAndSeed() {
  try {
    await mongoose.connect(process.env.mongodbURI, { family: 4 });
    console.log("✅ MongoDB connected");

    // 1. Delete ALL existing users and messages
    const deletedUsers = await User.deleteMany({});
    const deletedMessages = await Message.deleteMany({});
    console.log(`🗑️  Deleted ${deletedUsers.deletedCount} user(s)`);
    console.log(`🗑️  Deleted ${deletedMessages.deletedCount} message(s)`);

    // 2. Create Amit
    const amitPassword = await bcrypt.hash("Amit@12345", 10);
    const amit = await User.create({
      name: "Amit",
      email: "amit@example.com",
      password: amitPassword,
      confirmpassword: amitPassword,
    });
    console.log(`✅ Created user: Amit  (amit@example.com  |  password: Amit@12345)`);

    // 3. Create Anjali
    const anjaliPassword = await bcrypt.hash("Anjali@12345", 10);
    const anjali = await User.create({
      name: "Anjali",
      email: "anjali@example.com",
      password: anjaliPassword,
      confirmpassword: anjaliPassword,
    });
    console.log(`✅ Created user: Anjali (anjali@example.com | password: Anjali@12345)`);

    // 4. Seed hello messages – Amit says hello to Anjali
    await Message.create({
      from: amit._id.toString(),
      to: anjali._id.toString(),
      text: "Hello Anjali! 👋",
      createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 min ago
    });
    console.log("💬 Amit  → Anjali: Hello Anjali! 👋");

    // 5. Anjali replies hello back to Amit
    await Message.create({
      from: anjali._id.toString(),
      to: amit._id.toString(),
      text: "Hello Amit! 😊",
      createdAt: new Date(Date.now() - 1000 * 60 * 1), // 1 min ago
    });
    console.log("💬 Anjali → Amit:  Hello Amit! 😊");

    console.log("\n🎉 Reset & Seed completed successfully!");
    console.log("─────────────────────────────────────────");
    console.log("  👤 Amit    | amit@example.com    | Amit@12345");
    console.log("  👤 Anjali  | anjali@example.com  | Anjali@12345");
    console.log("─────────────────────────────────────────");

    process.exit(0);
  } catch (error) {
    console.error("❌ Reset failed:", error.message);
    process.exit(1);
  }
}

resetAndSeed();
