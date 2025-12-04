"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const patientSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    address: { type: String },
    doctor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Doctor' },
    complaint: { type: String },
    registrationDate: { type: Date, default: Date.now },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Patient', patientSchema);
