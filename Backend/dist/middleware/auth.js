"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorOnly = exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Not authorized, no token' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        const user = await User_1.default.findById(decoded.id).select('-password');
        if (!user)
            return res.status(401).json({ message: 'User not found' });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
exports.protect = protect;
const adminOnly = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
};
exports.adminOnly = adminOnly;
const doctorOnly = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. Doctor only.' });
    }
    next();
};
exports.doctorOnly = doctorOnly;
