"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPatient = exports.getTodayPatients = exports.getAllPatients = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const getAllPatients = async (req, res) => {
    const patients = await Patient_1.default.find().populate('doctor');
    res.json(patients);
};
exports.getAllPatients = getAllPatients;
const getTodayPatients = async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const patients = await Patient_1.default.find({ registrationDate: { $gte: start, $lte: end } }).populate('doctor');
    res.json(patients);
};
exports.getTodayPatients = getTodayPatients;
const registerPatient = async (req, res) => {
    const patient = await Patient_1.default.create(req.body);
    res.status(201).json(patient);
};
exports.registerPatient = registerPatient;
