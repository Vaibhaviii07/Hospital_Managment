"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicine = exports.getAllMedicines = void 0;
const Medicine_1 = __importDefault(require("../models/Medicine"));
const getAllMedicines = async (req, res) => {
    const medicines = await Medicine_1.default.find();
    res.json(medicines);
};
exports.getAllMedicines = getAllMedicines;
const createMedicine = async (req, res) => {
    const medicine = await Medicine_1.default.create(req.body);
    res.status(201).json(medicine);
};
exports.createMedicine = createMedicine;
