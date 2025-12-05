"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
const seedAdmin = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || "");
        console.log("✅ MongoDB Connected");
        // Check if admin already exists
        const existingAdmin = await User_1.default.findOne({ email: "dipanshukale2003@gmail.com" });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
            return;
        }
        const admin = await User_1.default.create({
            name: "Super Admin",
            email: "dipanshukale2003@gmail.com",
            password: "dipanshu@123",
            role: "admin",
        });
        console.log("✅ Admin created successfully:", {
            name: admin.name,
            email: admin.email,
            role: admin.role,
        });
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding admin:", error.message);
        process.exit(1);
    }
};
seedAdmin();
