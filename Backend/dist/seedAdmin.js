"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const User_js_1 = __importDefault(require("./models/User.js"));
dotenv_1.default.config();
const seedAdmin = async () => {
    try {
        await (0, db_js_1.default)(); // connect using your existing function
        const admin = await User_js_1.default.create({
            name: "Super Admin",
            email: "dipanshukale2003@gmail.com",
            password: "dipanshu@123",
            role: "admin",
        });
        console.log("Admin created:", admin);
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};
seedAdmin();
