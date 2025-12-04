"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.registerAdmin = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || '', { expiresIn: '30d' });
};
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User_1.default.findOne({ email });
    if (userExists)
        return res.status(400).json({ message: 'Admin already exists' });
    const user = await User_1.default.create({ name, email, password, role: 'admin' });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
    });
};
exports.registerAdmin = registerAdmin;
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Request body:", req.body);
    const user = await User_1.default.findOne({ email: email.trim() });
    console.log("Found user:", user);
    if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
        console.log("Password does not match");
        return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
    });
};
exports.login = login;
const getMe = async (req, res) => {
    const user = req.user;
    res.json(user);
};
exports.getMe = getMe;
