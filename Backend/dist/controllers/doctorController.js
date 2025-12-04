"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoctor = exports.getAllDoctors = void 0;
const Doctor_1 = __importDefault(require("../models/Doctor"));
const getAllDoctors = async (req, res) => {
    const doctors = await Doctor_1.default.find();
    res.json(doctors);
};
exports.getAllDoctors = getAllDoctors;
const createDoctor = async (req, res) => {
    const doctor = await Doctor_1.default.create(req.body);
    res.status(201).json(doctor);
};
exports.createDoctor = createDoctor;
