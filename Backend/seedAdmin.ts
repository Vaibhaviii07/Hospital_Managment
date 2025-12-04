import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB(); // connect using your existing function


    const admin = await User.create({
      name: "Super Admin",
      email: "dipanshukale2003@gmail.com",
      password: "dipanshu@123",
      role: "admin",
    });

    console.log("Admin created:", admin);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
