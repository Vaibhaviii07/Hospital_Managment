import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("✅ MongoDB Connected for seeding");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "dipanshukale2003@gmail.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists with this email");
      process.exit(0);
      return;
    }

    // Create admin
    const admin = await User.create({
      name: "Super Admin",
      email: "dipanshukale2003@gmail.com",
      password: "dipanshu@123",
      role: "admin",
    });

    console.log("✅ Admin created successfully:", {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
