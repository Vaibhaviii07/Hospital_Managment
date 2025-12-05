"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicine = exports.updateMedicine = exports.createMedicine = exports.getMedicine = exports.getAllMedicines = void 0;
const Medicine_1 = __importDefault(require("../models/Medicine"));
const getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine_1.default.find();
        res.json(medicines);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllMedicines = getAllMedicines;
const getMedicine = async (req, res) => {
    try {
        const medicine = await Medicine_1.default.findById(req.params.id);
        if (!medicine)
            return res.status(404).json({ message: 'Medicine not found' });
        res.json(medicine);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getMedicine = getMedicine;
const createMedicine = async (req, res) => {
    try {
        const medicine = await Medicine_1.default.create(req.body);
        res.status(201).json(medicine);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createMedicine = createMedicine;
const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!medicine)
            return res.status(404).json({ message: 'Medicine not found' });
        res.json(medicine);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateMedicine = updateMedicine;
const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine_1.default.findByIdAndDelete(req.params.id);
        if (!medicine)
            return res.status(404).json({ message: 'Medicine not found' });
        res.json({ message: 'Medicine deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteMedicine = deleteMedicine;
