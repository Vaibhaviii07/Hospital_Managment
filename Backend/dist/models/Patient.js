"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const prescriptionItemSchema = new mongoose_1.default.Schema({
    medicine: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    dosage: { type: String, required: true },
    duration: { type: String, required: true },
    notes: { type: String },
}, { _id: false });
const patientSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    doctor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    complaint: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    prescription: {
        items: [prescriptionItemSchema],
        issuedDate: { type: Date },
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Patient', patientSchema);
