"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const medicineSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    genericName: { type: String, required: true },
    strength: { type: String },
    type: { type: String, enum: ['Tablet', 'Syrup', 'Injection'], required: true },
    company: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Medicine', medicineSchema);
